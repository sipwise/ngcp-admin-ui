
export default {
    entity: {
        admins: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                },
                password: {
                    $p: {
                        $all: {
                            $own: 'id'
                        }
                    }
                }
            },
            apiKey: {
                $p: {
                    $all: {
                        $own: 'id'
                    }
                }
            }
        },
        resellers: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
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
        contracts: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        customercontacts: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        domains: {
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
                }
            }
        },
        subscriberprofilesets: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        subscriberprofiles: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        calllistsuppressions: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        billingprofiles: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        billingnetworks: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        profilepackages: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        invoicetemplates: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        invoices: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        vouchers: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        peeringgroups: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        rewriterulesets: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        rewriterules: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        headerrulesets: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        headerrules: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        ncoslevels: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        ncospatterns: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        soundsets: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        emailtemplates: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        bannedips: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        bannedusers: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        pbxdevices: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        lnpcarriers: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        lnpnumbers: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        emergencymappingcontainers: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        emergencymappings: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        customerlocations: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        phonebookentries: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        timesets: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        maliciouscalls: {
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
                systemstat: {
                    $p: {
                        read: true
                    }
                },
                billing: {
                    peeringCosts: {
                        $p: {
                            read: true
                        }
                    },
                    resellerRevenue: {
                        $p: {
                            read: true
                        }
                    },
                    customerRevenue: {
                        $p: {
                            read: true
                        }
                    }
                },
                peering: {
                    $p: {
                        read: true
                    }
                },
                reseller: {
                    $p: {
                        read: true
                    }
                }
            }
        },
        administrator: {
            edit: {
                $p: {
                    $all: true
                }
            }
        },
        domain: {
            preferences: {
                $p: {
                    read: true
                }
            }
        },
        customer: {
            preferences: {
                $p: {
                    read: true
                }
            }
        },
        reseller: {
            preferences: {
                $p: {
                    read: true
                }
            }
        }
    },
    tool: {
        $p: {
            $all: true
        }
    },
    statistic: {
        $p: {
            $all: true
        }
    },
    doc: {
        $p: {
            $all: true
        }
    }
}
