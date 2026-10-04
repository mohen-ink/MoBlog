/// <reference types="mdast" />
import { visit } from "unist-util-visit";

const CARD_FIELDS = ["description", "language", "stars", "forks", "license"];

export function remarkGithubCard() {
	const requests = new Map();
	return async (tree) => {
		const nodes = [];
		visit(tree, "leafDirective", (node) => {
			const repo = node.attributes?.repo;
			if (
				node.name === "github" &&
				typeof repo === "string" &&
				repo.includes("/") &&
				!CARD_FIELDS.every((key) => node.attributes[key] !== undefined)
			) {
				nodes.push(node);
			}
		});
		if (nodes.length === 0) return;

		const repos = [...new Set(nodes.map((n) => n.attributes.repo))];
		const dataMap = new Map();
		await Promise.all(
			repos.map(async (repo) => {
				if (!requests.has(repo)) requests.set(repo, fetchRepo(repo));
				const data = await requests.get(repo);
				dataMap.set(repo, data);
				if (!data) requests.delete(repo);
			}),
		);

		for (const node of nodes) {
			const data = dataMap.get(node.attributes.repo);
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
	const request = async (url, headers = {}) => {
		const res = await fetch(url, {
			headers,
			signal: AbortSignal.timeout(8000),
		});
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		return res.json();
	};
	const normalize = (data, stars) => {
		if (
			!data ||
			!Number.isFinite(stars) ||
			stars < 0 ||
			!Number.isFinite(data.forks) ||
			data.forks < 0
		) {
			throw new Error("Invalid repository response");
		}
		return {
			description: data.description ?? "",
			language: data.language ?? "",
			stars,
			forks: data.forks,
			license: data.license?.spdx_id ?? "",
		};
	};
	try {
		const headers = { Accept: "application/vnd.github+json" };
		if (process.env.GITHUB_TOKEN) {
			headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
		}
		const data = await request(`https://api.github.com/repos/${repo}`, headers);
		return normalize(data, data?.stargazers_count);
	} catch {
		try {
			const data = await request(`https://ungh.cc/repos/${repo}`);
			return normalize(data?.repo, data?.repo?.stars);
		} catch (err) {
			console.warn(
				`[remark-github-card] Failed to prefetch ${repo}:`,
				err.message,
			);
			return undefined;
		}
	}
}
