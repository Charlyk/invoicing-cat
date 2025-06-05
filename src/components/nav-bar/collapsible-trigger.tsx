'use client'
import { Collapsible, Icon, IconButton, useCollapsibleContext } from '@chakra-ui/react'
import { LuAlignRight, LuX } from 'react-icons/lu'

export const CollapsibleTrigger = () => {
  const context = useCollapsibleContext()
  return (
    <Collapsible.Trigger asChild>
      <IconButton
        aria-label="Open Menu"
        variant="ghost"
        size="sm"
        colorPalette="gray"
        hideFrom="md"
      >
        <Icon size="md">{context.open ? <LuX /> : <LuAlignRight />}</Icon>
      </IconButton>
    </Collapsible.Trigger>
  )
}
