import { Color } from "@/sanity/lib/sanity.types"
import { Badge, BadgeProps, Box, Tooltip } from "@mantine/core"


export interface ColourOptionProps extends BadgeProps {
    name: string
    colourOption?: Color
    selected: boolean
    onClick?: () => void
}

export const ColourOption: React.FC<ColourOptionProps> = ({ name, colourOption, selected, ...rest }) => {
    return <Tooltip label={name}>
        <Box
            {...rest}
            style={{
                minWidth: 32,
                height: 32,
                borderRadius: 4,
                backgroundColor: colourOption?.hex ?? 'transparent',
                border: colourOption && (selected ? '2px solid #000' : '1px solid #000'),
                cursor: 'pointer',
            }}
        >
            {colourOption === undefined && <Badge h='100%' radius='sm' variant={selected ? 'filled' : 'outline'} style={{ cursor: 'pointer' }}>{name}</Badge>}
        </Box>
    </Tooltip>
}