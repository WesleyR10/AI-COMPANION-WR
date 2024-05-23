import { Suspense } from "react";

import Categories from "@/components/categories";
import Companion from "@/components/companion";
import { SearchInput } from "@/components/search-input";
import CompanionSkeleton from "@/components/skeleton-ui/companions-skeleton";
import prismadb from "@/lib/primsadb";

interface rootPageProps {
    searchParams: {
        categoryId: string,
        name: string
    }
}

const RootPage = async ({ searchParams }: rootPageProps) => {

    const categories = await prismadb.category.findMany({});

    // const data = await prismadb.companion.findMany({
    //     where: {
    //         categoryId: searchParams.categoryId,
    //         name: {
    //             search: searchParams.name
    //         }
    //     },
    //     orderBy: {
    //         createdAt: 'desc'
    //     },
    //     include: {
    //         _count: {
    //             select: {
    //                 messages: true
    //             }
    //         }
    //     }
    // });

    return (
        <div className="h-full p-4 space-y-2">
            <SearchInput />
            <Categories data={categories} />
            <Suspense fallback={<CompanionSkeleton />}>
                <Companion searchParams={searchParams} />
                { /* <Companion data={data} />*/}
            </Suspense>
        </div>
    );
}

export default RootPage;