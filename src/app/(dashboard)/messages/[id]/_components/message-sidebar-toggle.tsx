
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {useMessageSidebarControl} from "@/hooks/useMessageSidebarControl";
import {useIsMobile} from "@/hooks/use-mobile";

export function MessageSidebarToggle() {

    const { isOpen, toggleSidebar } = useMessageSidebarControl();
    const isMobile = useIsMobile();

    if (!isMobile) return null;

    return (
        <Button
            variant="secondary"
            size="icon"
            onClick={toggleSidebar}
            className={"z-50"}
        >
            {isOpen ? <X className={"h-5 w-5"} /> : <Menu className={"h-5 w-5"} />}
        </Button>
    );
}