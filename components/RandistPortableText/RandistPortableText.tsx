import { Stack } from "@mantine/core"
import { PortableText, PortableTextProps } from "next-sanity"
import classes from "./RandistPortableText.module.css"

interface RandistPortableTextProps extends PortableTextProps { }


export const RandistPortableText: React.FC<RandistPortableTextProps> = (props) => {
    return <Stack gap={0} className={classes.randistPortableText}><PortableText
        {...props}
    />
    </Stack>
}