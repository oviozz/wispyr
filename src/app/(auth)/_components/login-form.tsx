
"use client"

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {login_schema} from "@/lib/definitions";
import {createFormData} from "@/app/(auth)/utils";
import {login} from "@/app/(auth)/_actions/auth";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoadingSpinner} from "@/components/loading-spinner";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

interface LoginFormType {
    email: string
    password: string
}

export default function LoginForm(){

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(login_schema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const loginHandler = async (data: LoginFormType) => {
        const formData = createFormData(data);
        const {success, message} = await login(formData);
        if (!success){
            toast.error(message || "An error occurred")
        } else {
            toast.success(message);
            router.push("/messages")
        }
    }

    return (
        <form onSubmit={handleSubmit(loginHandler)} className="space-y-6">
            <div className={"space-y-1"}>
                <Label>
                    Username
                </Label>
                <div>
                    <Input
                        {...register("email")}
                        id="email"
                        name="email"
                        type="text"
                    />
                    { errors.email && <p className={"mt-1 text-sm text-red-500"}>{errors.email.message}</p>}
                </div>
            </div>
            <div className={"space-y-1"}>
                <Label htmlFor="password">
                    Password
                </Label>
                <div>
                    <Input
                        {...register("password")}
                        id="password"
                        name="password"
                        type="password"
                    />
                    { errors.password && <p className={"mt-1 text-sm text-red-500"}>{errors.password.message}</p>}
                </div>
            </div>
            <div>
                <Button
                    disabled={isSubmitting}
                    variant={"main"}
                    type="submit"
                    className={"w-full h-10 font-semibold"}
                >
                    { isSubmitting && <LoadingSpinner />}
                    { isSubmitting ? (
                        "Signing in..."
                    ) : "Sign in"}
                </Button>
            </div>
        </form>
    )

}