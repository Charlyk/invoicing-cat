import {useEffect, useRef, useState} from "react";
import {Box} from "@chakra-ui/react";

export const InvoicePage = ({ children }: { children: React.ReactNode }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(1)

    const PAGE_WIDTH = 794
    const PAGE_HEIGHT = 1123

    useEffect(() => {
        const updateScale = () => {
            if (!containerRef.current) return

            const container = containerRef.current.getBoundingClientRect()
            const scaleX = container.width / PAGE_WIDTH
            const scaleY = container.height / PAGE_HEIGHT

            setScale(Math.min(scaleX, scaleY))
        }

        updateScale()
        window.addEventListener('resize', updateScale)
        return () => window.removeEventListener('resize', updateScale)
    }, [])

    return (
        <Box
            ref={containerRef}
            w="100%"
            maxW="1000px"
            hideBelow="md"
            mx="auto"
            position="relative"
            _before={{
                content: `""`,
                display: 'block',
                paddingTop: '141.4%', // A4 aspect ratio
            }}
        >
            <Box
                position="absolute"
                top={0}
                left={0}
                width={`${PAGE_WIDTH}px`}
                height={`${PAGE_HEIGHT}px`}
                transform={`scale(${scale})`}
                transformOrigin="top left"
                bg="bg.panel"
                boxShadow="lg"
                p={8}
                overflow="hidden"
                mb={6}
                className="invoice-page"
            >
                {children}
            </Box>
        </Box>
    )
}

export const MobileInvoicePage = ({ children }: { children: React.ReactNode }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(1)

    const PAGE_WIDTH = 794
    const PAGE_HEIGHT = 1123

    useEffect(() => {
        const updateScale = () => {
            if (!containerRef.current || !contentRef.current) return

            const containerWidth = containerRef.current.offsetWidth
            const scale = containerWidth / PAGE_WIDTH

            setScale(scale > 1 ? 1 : scale)
        }

        updateScale()

        const resizeObserver = new ResizeObserver(updateScale)
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current)
        }

        return () => resizeObserver.disconnect()
    }, [])

    const scaledHeight = PAGE_HEIGHT * scale

    return (
        <Box ref={containerRef}
             width="100%"
             hideFrom="md"
             maxW="1000px"
             mx="auto"
             height={`${scaledHeight}px`}
             position="relative">
            <Box
                ref={contentRef}
                width={`${PAGE_WIDTH}px`}
                height={`${PAGE_HEIGHT}px`}
                transform={`scale(${scale})`}
                transformOrigin="top left"
                bg="bg.panel"
                boxShadow="lg"
                p={8}
                overflow="hidden"
                mb={6}
            >
                {children}
            </Box>
        </Box>
    )
}
