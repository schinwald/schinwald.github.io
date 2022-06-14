export type ClassName = string | undefined;

export type Icon = {
    type: string;
    name: string;
    position: "top" | "right" | "bottom" | "left" | "center";
} | undefined;

export type Justification = "left" | "center" | "right" | undefined;

export type GitHubData = {
    repos: {
        name: string
        description: string
        development: {
            homepage_url: string
            tags: {
                name: string
                style: string 
            }[]
            license: string
            watchers: number
            forks: number
            stars: number
            commits: number
        }
        production: {
            homepage_url: string
            logo: {
                image_url: string
            }
            preview: {
                image_url: string
                video_url: string
            }
        }
    }[]
}

export type ContentfulHomeData = any