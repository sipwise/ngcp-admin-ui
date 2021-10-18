
export default {
    entity: {
        admins: {
            $p: {
                read: true,
                update: {
                    $own: 'id'
                }
            },
            columns: {
                id: {
                    $p: {
                        read: true
                    }
                },
                login: {
                    $p: {
                        read: true
                    }
                },
                email: {
                    $p: {
                        read: true,
                        update: {
                            $own: 'id'
                        }
                    }
                },
                password: {
                    $p: {
                        read: true,
                        update: {
                            $own: 'id'
                        }
                    }
                },
                apiKey: {
                    $p: {
                        create: {
                            $own: 'id'
                        },
                        delete: {
                            $own: 'id'
                        }
                    }
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
            }
        },
        administrator: {
            edit: {
                $p: {
                    read: true
                }
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
