import { auth } from '@clerk/nextjs/server';

import prismadb from '@/lib/primsadb'


const DAY_IN_MS = 86_400_000; // 24 hours in milliseconds

export const checkSubscription = async () => {
    const { userId } : { userId: string | null } = auth();

    if (!userId) {
        return false;
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId: userId
        },
        select: {
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
            stripeSubscriptionId: true
        }
    })

    if (!userSubscription) {
        return false;
    }

    const isValid =
        userSubscription.stripePriceId &&
        userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

    return !!isValid;
}