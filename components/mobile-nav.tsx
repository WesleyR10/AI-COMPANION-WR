import { Menu } from "lucide-react"

import { SideBar } from "@/components/side-bar"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

interface MobilNavProps {
    isPro: boolean
}

export const MobileNav = ({ isPro }: MobilNavProps) => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4">
                <Menu />
            </SheetTrigger>
            <SheetContent side={'left'} className="w-32 p-0 pt-10 bg-secondary">
                <SideBar isPro={isPro} />
            </SheetContent>
        </Sheet>
    )
}