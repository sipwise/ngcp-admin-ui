
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
                }
            }
        }
    },
    page: {
        dashboard: {
            $p: {
                read: true
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
    },
    tool: {
        batchprovisioning: {
            $p: {
                read: true
            }
        }
    }
}
