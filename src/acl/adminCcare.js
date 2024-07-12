
export default {
    entity: {
        customers: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        subscribers: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                },
                password: {
                    $p: {
                        $all: false
                    }
                },
                webpassword: {
                    $p: {
                        $all: false
                    }
                }
            }
        },
        cfmappings: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        }
    },
    page: {
        dashboard: {
            $p: {
                $all: true
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
                $all: true
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
