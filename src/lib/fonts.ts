
import {DM_Sans, Gabarito, Inter, Poppins} from 'next/font/google'

export const inter = Inter({
    subsets: ["latin"],
})

export const dm_sans = DM_Sans({
    subsets: ["latin"],
    weight: ["700", "800", "900"]
})

export const gabarito = Gabarito({
    weight: ['400','500','700','800','900'],
    subsets: ['latin'],
})


export const poppins = Poppins({
    weight: ['300', '500','400','500'],
    subsets: ['latin'],

})