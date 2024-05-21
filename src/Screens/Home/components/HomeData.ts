export interface HomeFields {
    id: number | string;
    title: string;
    type: string;
}

export const HomeData: Array<HomeFields> = [
    {
        id: 0,
        title: 'Tuyển tập hàng đầu',
        type: 'toplist',
    },
    {
        id: 20,
        title: 'Dành cho bạn',
        type: 'recommend',
    },
    {
        id: 60,
        title: 'Phổ biến',
        type: 'popular',
    },
]