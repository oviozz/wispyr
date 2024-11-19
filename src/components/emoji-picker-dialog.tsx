

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import { FaSmile  } from "react-icons/fa";

interface EmojiPickerDialogProps {
    onEmojiSelect: (emoji: string) => void
}
export function EmojiPickerDialog({onEmojiSelect}: EmojiPickerDialogProps) {

    const handleEmojiSelect = (emoji: { native: string }) => {
        onEmojiSelect(emoji.native);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={"focus-visible:ring-0"} asChild>
                <Button variant={"main"} className={"px-2"}>
                    <FaSmile className={"w-5 h-5 text-white"}/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"p-0"}>
                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}