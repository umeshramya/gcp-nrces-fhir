declare const body: {
    resourceType: string;
    id: string;
    meta: {
        versionId: string;
        lastUpdated: string;
        profile: string[];
        security: {
            system: string;
            code: string;
            display: string;
        }[];
    };
    identifier: {
        system: string;
        value: string;
    };
    type: string;
    timestamp: string;
    entry: ({
        fullUrl: string;
        resource: {
            resourceType: string;
            id: string;
            meta: {
                versionId: string;
                lastUpdated: string;
                profile: string[];
            };
            language: string;
            text: {
                status: string;
                div: string;
            };
            identifier: {
                system: string;
                value: string;
            };
            status: string;
            type: {
                coding: {
                    system: string;
                    code: string;
                    display: string;
                }[];
                text: string;
            };
            subject: {
                reference: string;
                display: string;
            };
            date: string;
            author: {
                reference: string;
                display: string;
            }[];
            title: string;
            custodian: {
                reference: string;
                display: string;
            };
            section: {
                title: string;
                code: {
                    coding: {
                        system: string;
                        code: string;
                        display: string;
                    }[];
                };
                entry: {
                    reference: string;
                    type: string;
                }[];
            }[];
            name?: undefined;
            telecom?: undefined;
            gender?: undefined;
            birthDate?: undefined;
            extension?: undefined;
            vaccineCode?: undefined;
            patient?: undefined;
            occurrenceDateTime?: undefined;
            primarySource?: undefined;
            lotNumber?: undefined;
            authority?: undefined;
            recommendation?: undefined;
            docStatus?: undefined;
            content?: undefined;
        };
    } | {
        fullUrl: string;
        resource: {
            resourceType: string;
            id: string;
            meta: {
                versionId: string;
                lastUpdated: string;
                profile: string[];
            };
            text: {
                status: string;
                div: string;
            };
            identifier: {
                type: {
                    coding: {
                        system: string;
                        code: string;
                        display: string;
                    }[];
                };
                system: string;
                value: string;
            }[];
            name: {
                text: string;
            }[];
            language?: undefined;
            status?: undefined;
            type?: undefined;
            subject?: undefined;
            date?: undefined;
            author?: undefined;
            title?: undefined;
            custodian?: undefined;
            section?: undefined;
            telecom?: undefined;
            gender?: undefined;
            birthDate?: undefined;
            extension?: undefined;
            vaccineCode?: undefined;
            patient?: undefined;
            occurrenceDateTime?: undefined;
            primarySource?: undefined;
            lotNumber?: undefined;
            authority?: undefined;
            recommendation?: undefined;
            docStatus?: undefined;
            content?: undefined;
        };
    } | {
        fullUrl: string;
        resource: {
            resourceType: string;
            id: string;
            meta: {
                profile: string[];
                versionId?: undefined;
                lastUpdated?: undefined;
            };
            text: {
                status: string;
                div: string;
            };
            identifier: {
                type: {
                    coding: {
                        system: string;
                        code: string;
                        display: string;
                    }[];
                };
                system: string;
                value: string;
            }[];
            name: string;
            telecom: {
                system: string;
                value: string;
                use: string;
            }[];
            language?: undefined;
            status?: undefined;
            type?: undefined;
            subject?: undefined;
            date?: undefined;
            author?: undefined;
            title?: undefined;
            custodian?: undefined;
            section?: undefined;
            gender?: undefined;
            birthDate?: undefined;
            extension?: undefined;
            vaccineCode?: undefined;
            patient?: undefined;
            occurrenceDateTime?: undefined;
            primarySource?: undefined;
            lotNumber?: undefined;
            authority?: undefined;
            recommendation?: undefined;
            docStatus?: undefined;
            content?: undefined;
        };
    } | {
        fullUrl: string;
        resource: {
            resourceType: string;
            id: string;
            meta: {
                versionId: string;
                lastUpdated: string;
                profile: string[];
            };
            text: {
                status: string;
                div: string;
            };
            identifier: {
                type: {
                    coding: {
                        system: string;
                        code: string;
                        display: string;
                    }[];
                };
                system: string;
                value: string;
            }[];
            name: {
                text: string;
            }[];
            telecom: {
                system: string;
                value: string;
                use: string;
            }[];
            gender: string;
            birthDate: string;
            language?: undefined;
            status?: undefined;
            type?: undefined;
            subject?: undefined;
            date?: undefined;
            author?: undefined;
            title?: undefined;
            custodian?: undefined;
            section?: undefined;
            extension?: undefined;
            vaccineCode?: undefined;
            patient?: undefined;
            occurrenceDateTime?: undefined;
            primarySource?: undefined;
            lotNumber?: undefined;
            authority?: undefined;
            recommendation?: undefined;
            docStatus?: undefined;
            content?: undefined;
        };
    } | {
        fullUrl: string;
        resource: {
            resourceType: string;
            id: string;
            meta: {
                versionId: string;
                lastUpdated: string;
                profile: string[];
            };
            text: {
                status: string;
                div: string;
            };
            extension: {
                url: string;
                valueString: string;
            }[];
            status: string;
            vaccineCode: {
                coding: {
                    system: string;
                    code: string;
                    display: string;
                }[];
            };
            patient: {
                reference: string;
            };
            occurrenceDateTime: string;
            primarySource: boolean;
            lotNumber: string;
            language?: undefined;
            identifier?: undefined;
            type?: undefined;
            subject?: undefined;
            date?: undefined;
            author?: undefined;
            title?: undefined;
            custodian?: undefined;
            section?: undefined;
            name?: undefined;
            telecom?: undefined;
            gender?: undefined;
            birthDate?: undefined;
            authority?: undefined;
            recommendation?: undefined;
            docStatus?: undefined;
            content?: undefined;
        };
    } | {
        fullUrl: string;
        resource: {
            resourceType: string;
            id: string;
            text: {
                status: string;
                div: string;
            };
            patient: {
                reference: string;
            };
            date: string;
            authority: {
                reference: string;
            };
            recommendation: {
                vaccineCode: {
                    coding: {
                        system: string;
                        code: string;
                        display: string;
                    }[];
                }[];
                forecastStatus: {
                    coding: {
                        system: string;
                        code: string;
                        display: string;
                    }[];
                };
                dateCriterion: {
                    code: {
                        coding: {
                            system: string;
                            code: string;
                            display: string;
                        }[];
                    };
                    value: string;
                }[];
                description: string;
                series: string;
                doseNumberPositiveInt: number;
                seriesDosesPositiveInt: number;
                supportingImmunization: {
                    reference: string;
                }[];
            }[];
            meta?: undefined;
            language?: undefined;
            identifier?: undefined;
            status?: undefined;
            type?: undefined;
            subject?: undefined;
            author?: undefined;
            title?: undefined;
            custodian?: undefined;
            section?: undefined;
            name?: undefined;
            telecom?: undefined;
            gender?: undefined;
            birthDate?: undefined;
            extension?: undefined;
            vaccineCode?: undefined;
            occurrenceDateTime?: undefined;
            primarySource?: undefined;
            lotNumber?: undefined;
            docStatus?: undefined;
            content?: undefined;
        };
    } | {
        fullUrl: string;
        resource: {
            resourceType: string;
            id: string;
            meta: {
                profile: string[];
                versionId?: undefined;
                lastUpdated?: undefined;
            };
            text: {
                status: string;
                div: string;
            };
            status: string;
            docStatus: string;
            type: {
                coding: {
                    system: string;
                    code: string;
                    display: string;
                }[];
                text: string;
            };
            subject: {
                reference: string;
                display?: undefined;
            };
            content: {
                attachment: {
                    contentType: string;
                    language: string;
                    data: string;
                    title: string;
                    creation: string;
                };
            }[];
            language?: undefined;
            identifier?: undefined;
            date?: undefined;
            author?: undefined;
            title?: undefined;
            custodian?: undefined;
            section?: undefined;
            name?: undefined;
            telecom?: undefined;
            gender?: undefined;
            birthDate?: undefined;
            extension?: undefined;
            vaccineCode?: undefined;
            patient?: undefined;
            occurrenceDateTime?: undefined;
            primarySource?: undefined;
            lotNumber?: undefined;
            authority?: undefined;
            recommendation?: undefined;
        };
    })[];
    signature: {
        type: {
            system: string;
            code: string;
            display: string;
        }[];
        when: string;
        who: {
            reference: string;
        };
        sigFormat: string;
        data: string;
    };
};
//# sourceMappingURL=Bundle-ImmunizationRecord.d.ts.map