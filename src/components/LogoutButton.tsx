import {LoadingSpinner} from "@/components/loading-spinner";
import {LogOut} from "lucide-react";
import {Button} from "@/components/ui/button";
import {logout} from "@/app/(auth)/_actions/auth";
import {toast} from "sonner";
import {useTransition} from "react";
import {useRouter} from "next/navigation";

export default function LogoutButton(){

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const logoutHandler = async () => {
        startTransition(async () => {
            try {
                await logout();
                toast.success("Successfully logged out");
                router.push("/");
            } catch (error) {
                console.log(error, "Error happened when loggig out");
                toast.error("Failed to log out. Please try again.");
            }
        });
    };

    return (
        <Button
            onClick={logoutHandler}
            variant="destructive"
            className="w-full flex items-center justify-center gap-2"
        >
            {isPending ? (
                <>
                    <LoadingSpinner size="sm" />
                    Logging out
                </>
            ) : (
                <>
                    <LogOut className="h-4 w-4" />
                    Log out
                </>
            )}
        </Button>
    )

}