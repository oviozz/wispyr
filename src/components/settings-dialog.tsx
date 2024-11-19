
"use client"

import { type MouseEvent as ReactMouseEvent } from 'react'
import {ChangeEvent, useEffect, useState, useTransition} from "react"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {Settings, X} from 'lucide-react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {useAuth} from "@/hooks/useAuth"
import {LoadingSpinner} from "@/components/loading-spinner"
import {getInitials} from "@/lib/utils"
import {useMutation} from "convex/react"
import {api} from "../../convex/_generated/api"
import {useRouter} from "next/navigation"
import {toast} from "sonner"
import { useQueryClient } from '@tanstack/react-query'
import {User} from "@/lib/types/user";
import {ThemeToggle} from "@/components/theme-toggle";

type ProfilePic = {
    imageBlob: string,
    imageFile: File
}

const ALLOWED_FILE_TYPES = ["image/png"]
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export default function SettingsDialog() {

    const { user } = useAuth()
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [profilePic, setProfilePic] = useState<ProfilePic | null>(null)
    const [error, setError] = useState<string>("")

    const [isPending, startTransition] = useTransition()
    const queryClient = useQueryClient();

    const generateUploadUrl = useMutation(api.users.generateUploadUrl)
    const updateUserAvatar = useMutation(api.users.updateUserAvatar)

    useEffect(() => {
        if (!user) {
            router.push("/")
            return
        }
        if (user && !user.avatar) {
            setIsOpen(true)
            setError("Please add a profile photo")
        }
    }, [user, isOpen, router])

    const validateFile = (file: File): string | null => {
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            return "Please upload a PNG file"
        }
        if (file.size > MAX_FILE_SIZE) {
            return "File size must be less than 5MB"
        }
        return null
    }

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files && files.length > 0) {
            const file = files[0]
            const validationError = validateFile(file)

            if (validationError) {
                setError(validationError)
                setProfilePic(null)
                return
            }

            setError("")
            const imgBlob = URL.createObjectURL(file)
            setProfilePic({
                imageBlob: imgBlob,
                imageFile: file,
            })
        }
    }

    const onFileClear = () => {
        setProfilePic(null)
        setError("")
    }

    const updateSetting = async (event: ReactMouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        if (!profilePic || !user) return

        startTransition(async () => {
            try {
                const postUrl = await generateUploadUrl()
                const { imageFile } = profilePic

                const fetchImage = await fetch(postUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": imageFile.type,
                        "Accept": "application/json"
                    },
                    body: imageFile,
                })

                if (!fetchImage.ok) {
                    throw new Error(`Upload failed: ${fetchImage.statusText}`)
                }

                const { storageId } = await fetchImage.json()

                const { success, imageUrl } = await updateUserAvatar({
                    imageId: storageId,
                    userId: user._id
                })

                if (!success) {
                    throw new Error("Failed to update avatar")
                }

                queryClient.setQueryData<User>(["user-info", user._id], prev => {
                    return {
                        ...(prev as User),
                        avatar: imageUrl,
                    }
                });

                setError("")
                setProfilePic(null)
                toast.success("Avatar has been updated")
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to update avatar")
                toast.error("Failed to update avatar")
            }
        })
    }

    if (!user) return <LoadingSpinner size={"sm"} />

    const { firstName, lastName, email, avatar, _creationTime } = user
    const fullName = `${firstName} ${lastName}`

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={"ghost"} className="w-full justify-start px-0">
                    <Settings className="text-blue-500 h-4 w-4" />
                    Settings
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle>User Settings</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-32 w-32 shadow">
                            {avatar && <AvatarImage src={avatar} />}
                            <AvatarFallback className={"text-3xl"}>{getInitials(fullName)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-center gap-2">
                            <Button variant={"outline"} asChild>
                                <Label htmlFor="avatar" className="cursor-pointer text-sm">
                                    Change Avatar
                                </Label>
                            </Button>
                            <p className="text-xs text-muted-foreground">
                                Supported formats: JPEG, PNG (max 5MB)
                            </p>
                        </div>
                        {profilePic?.imageFile && (
                            <div onClick={onFileClear} className={"group -mt-1 flex justify-center items-center gap-2 w-full"}>
                                <p className={"text-sm text-blue-500 dark:text-blue-300"}>{profilePic?.imageFile.name}</p>
                                <X className={"hover:cursor-pointer hover:bg-red-700 bg-red-500 p-1 rounded-xl h-5 w-5"}/>
                            </div>
                        )}
                        <Input
                            onChange={onFileChange}
                            id="avatar"
                            type="file"
                            accept="image/png"
                            className="hidden"
                            aria-label="Change avatar"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={email} disabled aria-readonly="true" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" value={firstName} disabled aria-readonly="true" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" value={lastName} disabled aria-readonly="true" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="creationTime">Account Created</Label>
                        <Input id="creationTime" value={new Date(_creationTime).toLocaleString()} disabled aria-readonly="true" />
                    </div>
                </div>
                {error && (
                    <p className={"text-sm p-1 rounded-xl text-center font-semibold bg-red-500 border-2 border-red-700"}>{error}</p>
                )}

                <div className={"flex items-center gap-2"}>
                    <Label>Change Theme:</Label>
                    <ThemeToggle />
                </div>

                <DialogFooter>
                    <Button onClick={updateSetting} disabled={!profilePic || isPending} variant={"main"}>
                        { isPending && <LoadingSpinner />}
                        {isPending ? "Saving..." : "Save Changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}