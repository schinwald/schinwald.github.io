import { Octokit } from 'octokit'
import { GitHubData } from '@utils/types'

const octokit = new Octokit({ auth: process.env.GITHUB_API_KEY });
    
export const fetchGitHub = async (repos: string[]) => {
    try {
        // get all devicon meta data
        const devicons = await fetch('https://raw.githubusercontent.com/devicons/devicon/master/devicon.json')
            .then(response => response.json())
            .then(jsons => {
                return jsons.reduce((accumulator: Map<string, any>, value: any) => {
                    accumulator.set(value.name, value)
                    return accumulator
                }, new Map<string, any>())
            })
        const promises: Promise<any>[] = []
        const size = 2
        for (const repo of repos) {
            promises.push(
                octokit.request('GET /repos/{owner}/{repo}', {
                    owner: 'schinwald',
                    repo: repo
                }),
                octokit.request('GET /repos/{owner}/{repo}/commits', {
                    owner: 'schinwald',
                    repo: repo
                })
            )
        }
        // perform all api calls asynchronously and stitch them together
        const github = await Promise.all(promises)
            .then((jsons) => jsons.map(json => json.data))
            .then((jsons) => {
                let github: GitHubData = {
                    repos: []
                }

                // loop through repos and fill in data
                for (let i = 0; i < repos.length; i++) {
                    github.repos.push({
                        name: jsons[size * i + 0].name,
                        description: jsons[size * i + 0].description,
                        development: {
                            homepage_url: jsons[size * i + 0].html_url,
                            tags: jsons[size * i + 0].topics.filter((topic: string) => devicons.get(topic))
                                .sort((a: string, b: string) => a.localeCompare(b))
                                .map((topic: string) => {
                                    return {
                                        name: devicons.get(topic).name,
                                        style: devicons.get(topic).versions.font[0]
                                    }
                                }),
                            license: jsons[size * i + 0].license?.name,
                            watchers: jsons[size * i + 0].watchers_count,
                            forks: jsons[size * i + 0].forks_count,
                            stars: jsons[size * i + 0].stargazers_count,
                            commits: jsons[size * i + 1].length
                        },
                        production: {
                            homepage_url: jsons[size * i + 0].homepage,
                            logo: {
                                image_url: `https://raw.githubusercontent.com/schinwald/${repos[i]}/main/logo.svg`,
                            },
                            preview: {
                                image_url: `https://raw.githubusercontent.com/schinwald/${repos[i]}/main/preview.jpg`,
                                video_url: `https://raw.githubusercontent.com/schinwald/${repos[i]}/main/preview.mp4`
                            }
                        }
                    })
                }

                return github
            })
        return JSON.stringify(github)
    } catch (error) {
        console.error(error)
        return null
    }
}