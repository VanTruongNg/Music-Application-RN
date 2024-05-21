import { useEffect, useState } from "react";


export const usePaginateData = ({ orgData, limit = 10 }: {
    orgData: any[],
    limit?: number
}) => {
    if (orgData.length < 15) return { handleLoadMore: () => { }, data: orgData, totalPages: 0 };

    const [data, setData] = useState<any>([])
    const [offset, setOffset] = useState(0)
    let limitx = 15 //lần đầu 15

    const totalPages = Math.ceil(orgData.length / limitx) * limitx;

    useEffect(() => {
        const startIndex = offset;
        const endIndex = Math.min(startIndex + limitx, orgData.length);

        const paginatedData = orgData.slice(startIndex, endIndex);

        setData((prev: any) => {
            return [...prev, ...paginatedData]
        })
        limitx = limit
    }, [offset])

    const handleLoadMore = () => {
        setOffset((prev) => prev + limitx)
    }

    return { handleLoadMore, data, totalPages };
}