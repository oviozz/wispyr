

import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const spinnerVariants = cva(
    'inline-block rounded-full border-4 border-t-blue-500 animate-spin',
    {
        variants: {
            size: {
                sm: 'w-4 h-4 border-2',
                md: 'w-6 h-6 border-4',
                lg: 'w-8 h-8 border-4',
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
    return <div className={clsx(spinnerVariants({ size }), className)} />
}