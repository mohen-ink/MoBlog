/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a GitHub Card component.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} properties.repo - The GitHub repository in the format "owner/repo".
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created GitHub Card component.
 */
export function GithubCardComponent(properties, children) {
	if (Array.isArray(children) && children.length !== 0)
		return h("div", { class: "hidden" }, [
			'Invalid directive. ("github" directive must be leaf type "::github{repo="owner/repo"}")',
		]);

	if (!properties.repo || !properties.repo.includes("/"))
		return h(
			"div",
			{ class: "hidden" },
			'Invalid repository. ("repo" attributte must be in the format "owner/repo")',
		);

	const repo = properties.repo;
	const cardUuid = `GC${Math.random().toString(36).slice(-6)}`; // Collisions are not important

	// Fields given as attributes (manually or injected by remarkGithubCard at
	// build time) override API values. Fully static when data was prefetched
	// at build or every field is provided — skips the client-side request.
	const staticFields = {};
	for (const key of ["description", "language", "stars", "forks", "license"]) {
		if (properties[key] !== undefined) staticFields[key] = properties[key];
	}
	const isStatic =
		properties["data-prefetched"] === "true" ||
		["description", "language", "stars", "forks", "license"].every(
			(k) => staticFields[k] !== undefined,
		);

	const nAvatar = h(`div#${cardUuid}-avatar`, {
		class: "gc-avatar",
		// The avatars endpoint is not rate limited, safe to set immediately
		style: `background-image: url(https://github.com/${repo.split("/")[0]}.png); background-color: transparent`,
	});
	const nLanguage = h(
		`span#${cardUuid}-language`,
		{ class: "gc-language" },
		isStatic ? staticFields.language : "Waiting...",
	);

	const nTitle = h("div", { class: "gc-titlebar" }, [
		h("div", { class: "gc-titlebar-left" }, [
			h("div", { class: "gc-owner" }, [
				nAvatar,
				h("div", { class: "gc-user" }, repo.split("/")[0]),
			]),
			h("div", { class: "gc-divider" }, "/"),
			h("div", { class: "gc-repo" }, repo.split("/")[1]),
		]),
		h("div", { class: "github-logo" }),
	]);

	const nDescription = h(
		`div#${cardUuid}-description`,
		{ class: "gc-description" },
		isStatic
			? staticFields.description || "Description not set"
			: "Waiting for api.github.com...",
	);

	const nStars = h(
		`div#${cardUuid}-stars`,
		{ class: "gc-stars" },
		isStatic ? staticFields.stars || "0" : "00K",
	);
	const nForks = h(
		`div#${cardUuid}-forks`,
		{ class: "gc-forks" },
		isStatic ? staticFields.forks || "0" : "0K",
	);
	const nLicense = h(
		`div#${cardUuid}-license`,
		{ class: "gc-license" },
		staticFields.license ?? "0K",
	);

	const nScript = h(
		`script#${cardUuid}-script`,
		{ type: "text/javascript", defer: true },
		`
      // ungh.cc is an unauthenticated GitHub API mirror without rate limits;
      // fall back to api.github.com when ungh fails. Field overrides provided
      // via directive attributes take precedence over fetched values.
      const overrides = ${JSON.stringify(staticFields)};
      const apply = (data) => {
        const fmt = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 });
        const v = { ...data, ...overrides };
        const license = typeof v.license === 'string' ? v.license : v.license?.spdx_id;
        document.getElementById('${cardUuid}-description').innerText = v.description?.replace(/:[a-zA-Z0-9_]+:/g, '') || "Description not set";
        document.getElementById('${cardUuid}-language').innerText = v.language || '';
        document.getElementById('${cardUuid}-forks').innerText = fmt.format(v.forks ?? 0).replaceAll("\\u202f", '');
        document.getElementById('${cardUuid}-stars').innerText = fmt.format(v.stars ?? v.stargazers_count ?? 0).replaceAll("\\u202f", '');
        document.getElementById('${cardUuid}-license').innerText = license || "no-license";
        document.getElementById('${cardUuid}-card').classList.remove("fetch-waiting");
        console.log("[GITHUB-CARD] Loaded card for ${repo} | ${cardUuid}.")
      };
      const fail = (err) => {
        const c = document.getElementById('${cardUuid}-card');
        c?.classList.add("fetch-error");
        console.warn("[GITHUB-CARD] (Error) Loading card for ${repo} | ${cardUuid}: " + err)
      };
      fetch('https://ungh.cc/repos/${repo}', { referrerPolicy: "no-referrer" })
        .then(r => r.ok ? r.json() : Promise.reject(new Error('ungh ' + r.status)))
        .then(j => j.repo ? j.repo : Promise.reject(new Error('ungh bad response')))
        .then(repo => {
          // ungh lacks language/license; best-effort enrich via official API.
          fetch('https://api.github.com/repos/${repo}', { referrerPolicy: "no-referrer" })
            .then(r => r.ok ? r.json() : Promise.reject(new Error(r.status)))
            .then(d => apply({ ...d, ...repo, language: d.language, license: d.license }))
            .catch(() => apply(repo));
        })
        .catch(() =>
          fetch('https://api.github.com/repos/${repo}', { referrerPolicy: "no-referrer" })
            .then(r => r.ok ? r.json() : Promise.reject(new Error('GitHub API ' + r.status)))
            .then(apply)
            .catch(fail)
        )
    `,
	);

	return h(
		`a#${cardUuid}-card`,
		{
			class: isStatic
				? "card-github no-styling"
				: "card-github fetch-waiting no-styling",
			href: `https://github.com/${repo}`,
			target: "_blank",
			repo,
		},
		[
			nTitle,
			nDescription,
			h("div", { class: "gc-infobar" }, [nStars, nForks, nLicense, nLanguage]),
			...(isStatic ? [] : [nScript]),
		],
	);
}
