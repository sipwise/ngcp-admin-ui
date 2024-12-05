
export default {
    entity: {
        customers: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            }
        },
        subscribers: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                },
                password: {
                    $p: {
                        read: false
                    }
                },
                webpassword: {
                    $p: {
                        read: false
                    }
                }
            }
        },
        cfmappings: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            },
            unconditional: {
                $p: {
                    read: false
                }
            },
            busy: {
                $p: {
                    read: false
                }
            },
            timeout: {
                $p: {
                    read: false
                }
            },
            unavailable: {
                $p: {
                    read: false
                }
            },
            sms: {
                $p: {
                    read: false
                }
            },
            onresponse: {
                $p: {
                    read: false
                }
            },
            onoverflow: {
                $p: {
                    read: false
                }
            }
        }
    },
    page: {
        dashboard: {
            $p: {
                read: true
            },
            card: {
                customer: {
                    $p: {
                        read: true
                    }
                }
            }
        },
        customer: {
            $p: {
                read: true
            }
        }
    },
    doc: {
        handbook: {
            $p: {
                read: true
            }
        },
        externaldocumentation: {
            $p: {
                read: true
            }
        }
    }
}
