// InvoiceDocument.tsx
'use client'

import React from 'react';
import {Page, Text, View, Document, StyleSheet, Image} from '@react-pdf/renderer';
import {colors} from '@/components/ui/theme';
import currencies, {Currency} from "@/data/currencies";
import {DateTime} from "luxon";
import discounts, {DiscountOption} from "@/data/discounts";
import {Font} from '@react-pdf/renderer'
import {Client} from "@/lib/db";

Font.register({
    family: "Geist",
    fonts: [
        {src: "/fonts/Geist-Regular.ttf", fontWeight: 'normal'},
        {src: "/fonts/Geist-Medium.ttf", fontWeight: 'medium'},
        {src: "/fonts/Geist-Bold.ttf", fontWeight: 'bold'},
    ]
})

export type ProductData = {
    title: string
    quantity: number
    price: number
}

export type InvoiceStrings = {
    details: {
        subject: string
        dueDate: string
        invoiceNumberTitle: string
        createdBy: string
        billedTo: string
        subtotal: string,
        grandTotal: string,
        discountTitle: string,
        taxTitle: string,
        notesTitle: string
    },
    products: {
        items: string,
        price: string,
        quantity: string,
        total: string,

    }
}

const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#ffffff',
        fontSize: 12,
        fontFamily: 'Geist',
    },
    headerContainer: {
        textAlign: 'right',
        marginBottom: 30,
    },
    headerContainerWithImage: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        textAlign: 'right',
        marginBottom: 30,
    },
    header: {
        fontSize: 10,
        color: colors.gray['400'].value,
    },
    valuesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    valueContainer: {
        flexDirection: 'column',
        width: '48%',
    },
    valueLabel: {
        fontSize: 10,
        color: colors.gray['400'].value,
        marginBottom: 2,
    },
    valueText: {
        fontSize: 12,
        color: colors.gray['800'].value,
        fontWeight: 'semibold',
        marginBottom: 4,
    },
    section: {
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: colors.gray['100'].value,
        padding: 8,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: `1 solid ${colors.gray['200'].value}`,
        padding: 8,
    },
    cell: {
        fontSize: 10,
        paddingRight: 6,
    },
    col8: {width: '50%'},
    col2: {width: '15%', textAlign: 'right'},
    colTotal: {width: '20%', textAlign: 'right'},
    totalsContainer: {
        marginTop: 24,
        alignSelf: 'flex-end',
        width: '40%',
        paddingHorizontal: 16
    },
    totalsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    notesContainer: {
        width: "100%",
        flexDirection: 'row',
    },
    notesTitle: {
        fontWeight: "semibold",
        fontSize: 10,
        marginRight: 4,
    },
    notesText: {
        fontSize: 10,
    }
});

export const InvoiceDocument = ({
                                    strings,
                                    logo,
                                    dueDate,
                                    subject,
                                    senderName, senderEmail,
                                    client,
                                    products,
                                    currency = currencies[0],
                                    discount = discounts[0],
                                    tax = 0,
                                    notes = ''
                                }: {
    strings: InvoiceStrings
    logo?: string | null
    dueDate: string
    subject: string
    senderName: string
    senderEmail: string
    client: Client
    products: ProductData[]
    currency?: Currency
    discount?: DiscountOption
    tax?: number // percent (e.g., 15)
    notes?: string
}) => {
    const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0)
    const discountAmount = subtotal * discount.numeric
    const taxableBase = subtotal - discountAmount
    const taxAmount = (tax / 100) * taxableBase
    const total = taxableBase + taxAmount

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency.code || 'USD',
        }).format(value);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={logo ? styles.headerContainerWithImage : styles.headerContainer}>
                    {logo && <Image src={logo} style={{height: "40px"}}/>}
                    <Text style={styles.header}>{strings.details.invoiceNumberTitle}</Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.valuesRow}>
                        <View style={styles.valueContainer}>
                            <Text style={styles.valueLabel}>{strings.details.dueDate}</Text>
                            <Text
                                style={styles.valueText}>{DateTime.fromSQL(dueDate).toLocaleString(DateTime.DATE_MED)}</Text>
                        </View>
                        <View style={styles.valueContainer}>
                            <Text style={styles.valueLabel}>{strings.details.subject}</Text>
                            <Text style={styles.valueText}>{subject || '---'}</Text>
                        </View>
                    </View>

                    <View style={styles.valuesRow}>
                        <View style={styles.valueContainer}>
                            <Text style={styles.valueLabel}>{strings.details.createdBy}</Text>
                            <Text style={styles.valueText}>{senderName || '---'}</Text>
                            {senderEmail && <Text style={styles.valueText}>{senderEmail}</Text>}
                        </View>
                        <View style={styles.valueContainer}>
                            <Text style={styles.valueLabel}>{strings.details.billedTo}</Text>
                            <Text style={styles.valueText}>{client.name || '---'}</Text>
                            {client.email && <Text style={styles.valueText}>{client.email}</Text>}
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.cell, styles.col8]}>{strings.products.items}</Text>
                        <Text style={[styles.cell, styles.col2]}>{strings.products.quantity}</Text>
                        <Text style={[styles.cell, styles.col2]}>{strings.products.price}</Text>
                        <Text style={[styles.cell, styles.colTotal]}>{strings.products.total}</Text>
                    </View>
                    {products.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={[styles.cell, styles.col8]}>{item.title}</Text>
                            <Text style={[styles.cell, styles.col2]}>{item.quantity}</Text>
                            <Text style={[styles.cell, styles.col2]}>
                                {formatCurrency(item.price)}
                            </Text>
                            <Text style={[styles.cell, styles.colTotal]}>
                                {formatCurrency((item.price * item.quantity))}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.totalsContainer}>
                    <View style={styles.totalsRow}>
                        <Text style={{
                            width: '50%',
                            textAlign: 'right',
                            fontSize: 10,
                            fontWeight: 'semibold'
                        }}>{strings.details.subtotal}</Text>
                        <Text style={{
                            width: '50%',
                            textAlign: 'right',
                            fontSize: 10,
                            fontWeight: 'semibold'
                        }}>{formatCurrency(subtotal)}</Text>
                    </View>
                    {discountAmount > 0 && (
                        <View style={styles.totalsRow}>
                            <Text style={{
                                width: '50%',
                                textAlign: 'right',
                                fontSize: 10,
                                fontWeight: 'semibold'
                            }}>{strings.details.discountTitle}</Text>
                            <Text style={{
                                width: '50%',
                                textAlign: 'right',
                                fontSize: 10,
                                fontWeight: 'semibold'
                            }}>-{formatCurrency(discountAmount)}</Text>
                        </View>
                    )}
                    {taxAmount > 0 && (
                        <View style={styles.totalsRow}>
                            <Text style={{
                                width: '50%',
                                textAlign: 'right',
                                fontSize: 10,
                                fontWeight: 'semibold'
                            }}>{strings.details.taxTitle}</Text>
                            <Text style={{
                                width: '50%',
                                textAlign: 'right',
                                fontSize: 10,
                                fontWeight: 'semibold'
                            }}>{formatCurrency(taxAmount)}</Text>
                        </View>
                    )}
                    <View style={styles.totalsRow}>
                        <Text style={{
                            width: '50%',
                            textAlign: 'right',
                            fontSize: 10,
                            fontWeight: 'semibold'
                        }}>{strings.details.grandTotal}</Text>
                        <Text style={{
                            width: '50%',
                            textAlign: 'right',
                            fontSize: 10,
                            fontWeight: 'semibold'
                        }}>{formatCurrency(total)}</Text>
                    </View>
                </View>
                {notes && (
                    <View style={styles.notesContainer}>
                        <Text style={styles.notesTitle}>{strings.details.notesTitle}:</Text>
                        <Text style={styles.notesText}>{notes}</Text>
                    </View>
                )}
            </Page>
        </Document>
    )
}
