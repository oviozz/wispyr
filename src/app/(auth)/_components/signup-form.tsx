
"use client"

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import {signup_schema, SignupFormData} from "@/lib/definitions";
import {createFormData} from "@/app/(auth)/utils";
import {LoadingSpinner} from "@/components/loading-spinner";
import {useRouter} from "next/navigation";
import {signup_action} from "@/app/(auth)/_actions/auth";
import {toast} from "sonner";

interface SignUpTypes {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}
export default function SignupForm(){

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SignupFormData>({
        resolver: zodResolver(signup_schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const submitHandler = async (data: SignUpTypes) => {
        const formData = createFormData(data);
        const { success, message } = await signup_action(formData);
        if (!success){
            toast.error(message);
        } else {
            toast.success(message)
        }
        router.push("/messages")
    }


    return (
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
            <div className={"flex gap-3"}>
                <div className="space-y-1 flex-1">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        id="firstName"
                        {...register("firstName")}
                        className={errors.firstName ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                    { errors.firstName && <p className={"text-sm text-red-500"}>{errors.firstName.message}</p> }
                </div>

                <div className={"flex-1 space-y-1"}>
                    <Label htmlFor={"lastName"}>Last Name</Label>
                    <Input
                        id={"lastName"}
                        {...register("lastName")}
                        className={errors.lastName ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                    { errors.lastName && <p className={"text-sm text-red-500"}>{errors.lastName.message}</p> }
                </div>
            </div>

            <div className={"space-y-1"}>
                <Label>Email</Label>
                <Input
                    id="email"
                    {...register("email")}
                    type="email"
                    className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                { errors.email && <p className={"text-sm text-red-500"}>{errors.email.message}</p> }
            </div>

            <div className={"space-y-1"}>
                <Label htmlFor="password">Password</Label>
                <Input
                    id={"password"}
                    type={"password"}
                    {...register("password")}
                    className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                { errors.password && <p className={"text-sm text-red-500"}>{errors.password.message}</p> }
            </div>

            <div className={"space-y-1"}>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    id="confirmPassword"
                    {...register("confirmPassword")}
                    type="password"
                    className={errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                { errors.confirmPassword && <p className={"text-sm text-red-500"}>{errors.confirmPassword.message}</p> }
            </div>

            <Button
                variant={"main"}
                type="submit"
                className={"w-full h-10 font-semibold flex items-center"}
            >
                { isSubmitting && <LoadingSpinner size={"sm"} /> }
                { isSubmitting ? "Signing up..." : "Create Account" }
            </Button>
        </form>
    )

}