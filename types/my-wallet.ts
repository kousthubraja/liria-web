export interface MyWallet {
    address?: string;
    ensName?: string;
    avatar?: string;
}

export interface PostFromChain {
    articleId?: number,
    cid?: string;
    author?: string;
    validityScore?: number;
}

export interface Post {
    articleId?: number,
    cid?: string,
    title?: string;
    content: string;
    author?: string;
    validityScore?: number;
}