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

	const staticFields = {};
	for (const key of ["description", "language", "stars", "forks", "license"]) {
		if (properties[key] !== undefined) staticFields[key] = properties[key];
	}
	const isStatic =
		properties.dataPrefetched === "true" ||
		properties["data-prefetched"] === "true" ||
		["description", "language", "stars", "forks", "license"].every(
			(k) => staticFields[k] !== undefined,
		);
	const fmt = Intl.NumberFormat("en-us", {
		notation: "compact",
		maximumFractionDigits: 1,
	});
	const formatCount = (value) =>
		value !== undefined &&
		value !== null &&
		value !== "" &&
		Number.isFinite(Number(value))
			? fmt.format(Number(value)).replaceAll("\u202f", "")
			: "—";
	const serialize = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");

	const nAvatar = h(`div#${cardUuid}-avatar`, {
		class: "gc-avatar",
		style: `background-image: url(https://github.com/${repo.split("/")[0]}.png); background-color: transparent`,
	});
	const nLanguage = h(
		`span#${cardUuid}-language`,
		{ class: "gc-language" },
		staticFields.language || "",
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
			? staticFields.description?.replace(/:[a-zA-Z0-9_]+:/g, "") ||
					"Description not set"
			: staticFields.description || "Loading repository data...",
	);

	const nStars = h(
		`div#${cardUuid}-stars`,
		{ class: "gc-stars" },
		formatCount(staticFields.stars),
	);
	const nForks = h(
		`div#${cardUuid}-forks`,
		{ class: "gc-forks" },
		formatCount(staticFields.forks),
	);
	const nLicense = h(
		`div#${cardUuid}-license`,
		{ class: "gc-license" },
		staticFields.license || (isStatic ? "no-license" : "—"),
	);

	const nScript = isStatic
		? undefined
		: h(
				`script#${cardUuid}-script`,
				{ type: "text/javascript" },
				`
      (() => {
        const card = document.getElementById('${cardUuid}-card');
        if (!card) return;
        const overrides = ${serialize(staticFields)};
        const repo = ${serialize(repo)};
        const fmt = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 });
        const formatCount = (value) =>
          value !== undefined && value !== null && value !== '' && Number.isFinite(Number(value))
            ? fmt.format(Number(value)).replaceAll("\\u202f", '')
            : '—';
        const setText = (name, value) => {
          const element = card.querySelector('.gc-' + name);
          if (element) element.textContent = value;
        };
        const apply = (data) => {
          if (!card.isConnected) return;
          const v = { ...data, ...overrides };
          const license = typeof v.license === 'string' ? v.license : v.license?.spdx_id;
          setText('description', v.description?.replace(/:[a-zA-Z0-9_]+:/g, '') || "Description not set");
          setText('language', v.language || '');
          setText('forks', formatCount(v.forks));
          setText('stars', formatCount(v.stars));
          setText('license', license || "no-license");
          card.classList.remove("fetch-waiting", "fetch-error");
        };
        const request = async (url, mirror = false) => {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 8000);
          try {
            const response = await fetch(url, { referrerPolicy: "no-referrer", signal: controller.signal });
            if (!response.ok) throw new Error('HTTP ' + response.status);
            const json = await response.json();
            const data = mirror ? json?.repo : json;
            const stars = mirror ? data?.stars : data?.stargazers_count;
            if (!data || !Number.isFinite(stars) || stars < 0 || !Number.isFinite(data.forks) || data.forks < 0) {
              throw new Error('Invalid repository response');
            }
            return { ...data, stars };
          } finally {
            clearTimeout(timeout);
          }
        };
        request('https://api.github.com/repos/' + repo)
          .catch(() => request('https://ungh.cc/repos/' + repo, true))
          .then(apply)
          .catch((err) => {
            if (!card.isConnected) return;
            apply({ description: "Repository data unavailable", license: '—' });
            card.classList.add("fetch-error");
            console.warn('[GITHUB-CARD] Failed to load ' + repo + ': ' + err.message);
          });
      })();
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
