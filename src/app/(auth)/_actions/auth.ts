
"use server"

import {login_schema, signup_schema} from "@/lib/definitions";
import bcrypt from 'bcrypt';
import {fetchMutation, fetchQuery} from "convex/nextjs";
import {api} from "../../../../convex/_generated/api";
import {createSession, deleteSession} from "@/app/(auth)/_actions/session";

export async function signup_action(formData: FormData){

    const validated_fields = signup_schema.safeParse({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        username: formData.get("userName"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword")
    })

    if (!validated_fields.success){
        return {
            success: false,
            errors: validated_fields.error.flatten().fieldErrors,
        }
    }

    const { firstName, lastName, email, password } = validated_fields.data;
    const hashedPassword = await bcrypt.hash(password, 10);


    const { success, message, userId } = await fetchMutation(api.users.createUser, {
        firstName,
        lastName,
        email,
        hashedPassword
    });

    if (!success && !userId){
        return { success, message }
    }

    await createSession(userId);

    return { success, message }
}

export async function login(formData: FormData){

    const validated_schema = login_schema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    })

    if (!validated_schema.success){
        return {
            success: false,
            errors: validated_schema.error.flatten().fieldErrors
        }
    }

    const { email, password } = validated_schema.data;
    const user = await fetchQuery(api.users.findUserByEmail, {
        email: email
    })

    if (!user){
        return {
            success: false,
            message: "Email was not found"
        }
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch){
        return {
            success: false,
            message: "Password does not match"
        }
    }

    await createSession(user._id);

    return { success: true, message: "Successfully Logged In" }

}

export async function logout(){
    await deleteSession();
}