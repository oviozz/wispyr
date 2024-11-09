
import {cn} from "@/lib/utils";
import {dm_sans} from "@/lib/fonts";

interface BrandTitleProps {
    className?: string
}
export default function BrandTitle({ className }: BrandTitleProps){

    return (
        <h2 className={cn("text-3xl font-extrabold text-blue-500 tracking-tight", className, dm_sans.className)}>
            wispyr.
        </h2>
    )


}