import { Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { BeatLoader } from 'react-spinners'

import { BotAvatar } from "@/components/bot-avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";

export interface ChatMessageProps {
    role: "system" | "user"
    content?: string;
    isLoading?: boolean;
    src?: string
}

export const ChatMessage = ({
    role,
    content,
    isLoading,
    src
}: ChatMessageProps) => {

    const { toast } = useToast()
    const { theme } = useTheme()

    const onCopy = () => {
        if (!content) {
            return
        }
        navigator.clipboard.writeText(content);
        toast({
            description: "Message copied to clipboard"
        });

    }
    return (
        <div className={cn(
            "group flex items-start gap-x-3 py-4 w-full",
            role === "user" && "justify-end"
        )}>

            {role !== 'user' && <BotAvatar src={src!} />}
            <div className="bg-primary/20 px-4 py-2 rounded-md max-w-sm text-sm">
                {isLoading
                    ? <BeatLoader
                        color={theme === "light" ? "dark" : "white"}
                        loading={isLoading}
                        size={5}
                    />
                    : content}
            </div>
            {role === 'user' && <UserAvatar />}
            {role !== 'user' && !isLoading && (
                <Button
                    className="opacity-0 group-hover:opacity-100 transition"
                    size={'icon'}
                    variant={'ghost'}
                    onClick={onCopy}
                >
                    <Copy className="w-4 h-4" />
                </Button>
            )}
        </div>
    )
}