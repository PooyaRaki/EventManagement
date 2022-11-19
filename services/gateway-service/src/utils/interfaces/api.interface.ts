export interface ApiContract<T> {
    data: T,
    paging?: Paging,
    message?: string,
    notification?: object,
}

export interface Paging {
    total: number;
    limit: number;
    offset: number;
}