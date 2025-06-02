'use client'

import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import {colors} from "@/components/ui/theme";

// Create styles
const styles = StyleSheet.create({
    page: {
        width: '100%',
        height: '100%',
        padding: 40,
        backgroundColor: '#ffffff'
    },
    headerContainer: {
        textAlign: 'right',
        marginBottom: 40,
    },
    header: {
        fontSize: 15,
        color: colors.gray["400"].value,
    },
    valuesRow: {
        flexDirection: 'row',
        marginBottom: 40,
    },
    valueContainer: {
        width: '50%',
        flexDirection: 'column',
    },
    valueLabel: {
        fontSize: 12,
        color: colors.gray["400"].value,
        marginBottom: 5,
    },
    valueText: {
        fontSize: 15,
        color: colors.gray["800"].value,
        fontWeight: 'bold',
    },
    section: {
        flex: 1
    }
});

// Create Document Component
export const InvoiceDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Invoice #123456</Text>
            </View>
            <View style={styles.section}>
                <View style={styles.valuesRow}>
                    <View style={styles.valueContainer}>
                        <Text style={styles.valueLabel}>Due date</Text>
                        <Text style={styles.valueText}>2021-01-01</Text>
                    </View>

                    <View style={styles.valueContainer}>
                        <Text style={styles.valueLabel}>Subject</Text>
                        <Text style={styles.valueText}>Design services</Text>
                    </View>
                </View>
                <View style={styles.valuesRow}>
                    <View style={styles.valueContainer}>
                        <Text style={styles.valueLabel}>Billed to</Text>
                        <Text style={styles.valueText}>John Doe</Text>
                        <Text style={styles.valueText}>john.doe@email.com</Text>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <Text>Section #2</Text>
            </View>
            <View style={styles.section}>
                <Text>Section #3</Text>
            </View>
        </Page>
    </Document>
);
