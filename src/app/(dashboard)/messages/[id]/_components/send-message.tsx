
import { EmojiPickerDialog } from "@/components/emoji-picker-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoSend } from "react-icons/io5";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { message_schema } from "@/lib/definitions";
import { useMutation } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { MessageType } from "@/lib/types/messages";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SendMessageProps {
    roomId: Id<"chat_rooms">;
    userId: Id<"users"> | undefined;
}

export default function SendMessage({ roomId, userId }: SendMessageProps) {
    const router = useRouter();
    const [isSending, setIsSending] = useState(false);

    // Redirect if no user ID
    if (!userId) {
        toast.error("Please refresh your page. Error");
        router.push("/");
    }

    const sendMessageMutation = useMutation(api.messages.sendMessages);

    const {
        getValues,
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm<MessageType>({
        resolver: zodResolver(message_schema),
        defaultValues: {
            sender_id: userId,
            chat_room_id: roomId,
            content: "",
            reply_to_id: undefined,
        },
    });

    const handleEmojiSelect = (emoji: string) => {
        const currentContent = getValues("content") || "";
        setValue("content", currentContent + emoji, {
            shouldValidate: true,
        });
    };

    const sendMessageHandler = async (data: MessageType) => {
        if (!userId) {
            toast.error("You must be logged in to send messages");
            return;
        }

        try {
            setIsSending(true);
            const result = await sendMessageMutation({
                sender_id: userId,
                chat_room_id: roomId,
                content: data.content.trim(),
                reply_to_id: data.reply_to_id,
            });

            if (!result.success) {
                throw new Error(result.message);
            }

            reset({ content: "" });
        } catch (error) {
            toast.error("Failed to send message. Please try again.");
            console.error("Send message error:", error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="flex flex-col gap-1">
            {errors.content && (
                <div className="flex justify-center">
          <span className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-t-lg">
            {errors.content.message}
          </span>
                </div>
            )}

            <div className="border-t p-4 shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <form
                    onSubmit={handleSubmit(sendMessageHandler)}
                    className="flex items-center gap-2"
                >
                    <EmojiPickerDialog
                        onEmojiSelect={handleEmojiSelect}
                    />

                    <div className="flex-1 relative">
                        <Input
                            type="text"
                            className="w-full rounded-lg bg-background px-4 py-2 text-base focus-visible:ring-offset-1"
                            placeholder="Type a message..."
                            disabled={isSubmitting || isSending}
                            autoComplete="off"
                            {...register("content")}
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="main"
                        className="font-semibold gap-2"
                        disabled={isSubmitting || isSending}
                    >
                        {isSending ? "Sending..." : "Send"}
                        <IoSend className="w-4 h-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
}