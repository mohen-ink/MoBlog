/// <reference types="mdast" />
import { visit } from "unist-util-visit";

const CARD_FIELDS = ["description", "language", "stars", "forks", "license"];

/**
 * Fetches repository data for `::github{repo="o/r"}` leaf directives at
 * build time and injects the result as directive attributes, so the card
 * renders fully static HTML with no client-side API request.
 *
 * Uses ungh.cc (an unauthenticated GitHub API mirror) as the primary source
 * and api.github.com to enrich fields ungh lacks (language, license).
 * If fetching fails entirely, the directive keeps its original attributes
 * and the card falls back to client-side fetching.
 */
export function remarkGithubCard() {
	return async (tree) => {
		/** @type {import('mdast').Node[]} */
		const nodes = [];
		visit(tree, "leafDirective", (node) => {
			const repo = node.attributes?.repo;
			if (node.name === "github" && typeof repo === "string" && repo.includes("/")) {
				nodes.push(node);
			}
		});
		if (nodes.length === 0) return;

		const repos = [...new Set(nodes.map((n) => n.attributes.repo))];
		const dataMap = {};
		await Promise.all(
			repos.map(async (repo) => {
				dataMap[repo] = await fetchRepo(repo);
			}),
		);

		for (const node of nodes) {
			const data = dataMap[node.attributes.repo];
			if (!data) continue;
			for (const key of CARD_FIELDS) {
				if (node.attributes[key] === undefined && data[key] !== undefined) {
					node.attributes[key] = String(data[key]);
				}
			}
			node.attributes["data-prefetched"] = "true";
		}
	};
}

async function fetchRepo(repo) {
	const fromUngh = async () => {
		const res = await fetch(`https://ungh.cc/repos/${repo}`);
		if (!res.ok) throw new Error(`ungh ${res.status}`);
		const j = await res.json();
		if (!j?.repo) throw new Error("ungh bad response");
		return {
			description: j.repo.description ?? undefined,
			stars: j.repo.stars,
			forks: j.repo.forks,
		};
	};
	const fromApi = async () => {
		const res = await fetch(`https://api.github.com/repos/${repo}`);
		if (!res.ok) throw new Error(`GitHub API ${res.status}`);
		const d = await res.json();
		return {
			description: d.description ?? undefined,
			language: d.language ?? undefined,
			stars: d.stargazers_count,
			forks: d.forks,
			license: d.license?.spdx_id,
		};
	};
	try {
		const ungh = await fromUngh();
		const api = await fromApi().catch(() => ({}));
		return { ...api, ...ungh, language: api.language, license: api.license };
	} catch {
		try {
			return await fromApi();
		} catch (err) {
			console.warn(`[remark-github-card] Failed to prefetch ${repo}:`, err);
			return undefined;
		}
	}
}
