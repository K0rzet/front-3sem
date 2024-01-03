export interface IRouterItem {
    name: string
    link: string
    component: React.ComponentType<any>;
}

export interface IRouter {
    items: IRouterItem[]
}
