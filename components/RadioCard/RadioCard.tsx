import { Group, Radio, Text, useMantineTheme } from "@mantine/core"
import React from "react"

interface RadioCardProps {
    value: string
    label: string
    description?: string | React.ReactNode
    selected: boolean
}

export const RadioCard: React.FC<RadioCardProps> = (props) => {
    const theme = useMantineTheme()
    return (
        <Radio.Card value={props.value} styles={{
            card: {
                border: props.selected ? `1px solid ${theme.colors[theme.primaryColor][6]}` : `1px solid ${theme.colors.gray[3]}`,
                backgroundColor: props.selected ? theme.colors[theme.primaryColor][0] : theme.white,
            },
        }}>
            <Group wrap="nowrap" align="flex-start" p='sm'>
                <Radio.Indicator mt={3} />
                <div>
                    <Text w={500}>{props.label}</Text>
                    {props.description && <Text size='sm'>{props.description}</Text>}
                </div>
            </Group>
        </Radio.Card>
    )
}