
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
                        read: true,
                        update: {
                            $own: 'id'
                        }
                    }
                },
                login: {
                    $p: {
                        read: true,
                        update: true
                    }
                },
                password: {
                    $p: {
                        update: {
                            $own: 'id'
                        }
                    }
                },
                email: {
                    $p: {
                        read: true,
                        update: true
                    }
                },
                is_master: {
                    $p: {
                        read: true
                    }
                },
                is_ccare: {
                    $p: {
                        read: true
                    }
                },
                is_active: {
                    $p: {
                        read: true
                    }
                },
                read_only: {
                    $p: {
                        read: true
                    }
                },
                show_passwords: {
                    $p: {
                        read: true
                    }
                },
                call_data: {
                    $p: {
                        read: true
                    }
                },
                billing_data: {
                    $p: {
                        read: true
                    }
                },
                can_reset_password: {
                    $p: {
                        read: true
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
        customercontacts: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                },
                reseller_id: {
                    $p: {
                        create: false
                    }
                }
            }
        },
        systemcontacts: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
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
                },
                reseller_id: {
                    $p: {
                        create: false
                    }
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
        subscriberregistrations: {
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
                },
                reseller_id: {
                    $p: {
                        create: false,
                        update: false
                    }
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
        billingprofiles: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                },
                reseller_id: {
                    $p: {
                        create: false,
                        update: false
                    }
                }
            }
        },
        billingfees: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        billingzones: {
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
        billingvouchers: {
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
        rewriterulesets: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                },
                reseller_id: {
                    $p: {
                        create: false,
                        update: false
                    }
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
        ncoslnpcarriers: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        ncoslnppatterns: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        ncos: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                },
                reseller_id: {
                    $p: {
                        create: false,
                        update: false
                    }
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
                },
                reseller_id: {
                    $p: {
                        create: false,
                        update: false
                    }
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
        pbxdevicemodels: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        pbxdeviceconfigs: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        pbxdevicefirmwares: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        pbxdeviceprofiles: {
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
                },
                reseller_id: {
                    $p: {
                        create: false
                    }
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
        resellerphonebookentries: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        customerphonebookentries: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        subscriberphonebookentries: {
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
                },
                reseller_id: {
                    $p: {
                        create: false,
                        update: false
                    }
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
        },
        balanceintervals: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        subscriberlocationmappings: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        ccmapentries: {
            $p: {
                read: true,
                update: true,
                delete: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        speeddial: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        autoattendants: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            }
        },
        sipcaptures: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        voicemails: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        callrecordings: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        topuplogs: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        journals: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            }
        },
        customerspeeddials: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
                }
            }
        },
        customerfraudpreferences: {
            $p: {
                $all: true
            },
            columns: {
                $p: {
                    $all: true
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
        },
        reminders: {
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
                },
                domain: {
                    $p: {
                        read: true
                    }
                },
                billing: {
                    resellerCost: {
                        $p: {
                            read: true
                        }
                    },
                    customerRevenue: {
                        $p: {
                            read: true
                        }
                    }
                }
            }
        },
        panelBranding: {
            $p: {
                $all: true
            }
        },
        administrator: {
            edit: {
                $p: {
                    read: true
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
        },
        peeringservers: {
            preferences: {
                $p: {
                    read: true
                }
            }
        }
    },
    tool: {
        batchprovisioning: {
            $p: {
                $all: true
            }
        }
    },
    doc: {
        $p: {
            $all: true
        },
        links: {
            $p: {
                read: false
            }
        }
    },
    ngcp: {
        version: {
            $p: {
                read: true
            }
        }
    }
}
