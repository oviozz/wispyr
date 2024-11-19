
import { ImSpinner } from "react-icons/im";
import { cva, type VariantProps } from 'class-variance-authority'
import {cn} from "@/lib/utils";

const spinnerVariants = cva(
    'text-white animate-spin',
    {
        variants: {
            size: {
                sm: 'w-4 h-4',
                md: 'w-5 h-5',
                lg: 'w-8 h-8',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    }
)

interface LoadingSpinnerProps extends VariantProps<typeof spinnerVariants> {
    className?: string
}

export const LoadingSpinner = ({ size, className }: LoadingSpinnerProps) => {
    return <ImSpinner className={cn(spinnerVariants({ size }), className)} />
}