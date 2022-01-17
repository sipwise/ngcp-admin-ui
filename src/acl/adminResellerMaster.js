
export default {
    entity: {
        admins: {
            $p: {
                $all: true
            },
            columns: {
                id: {
                    $p: {
                        read: true
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
                        create: true,
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
                        read: true,
                        update: true
                    }
                },
                is_ccare: {
                    $p: {
                        read: true,
                        update: true
                    }
                },
                is_active: {
                    $p: {
                        read: true,
                        update: true
                    }
                },
                read_only: {
                    $p: {
                        read: true,
                        update: true
                    }
                },
                show_passwords: {
                    $p: {
                        read: true,
                        update: true
                    }
                },
                call_data: {
                    $p: {
                        read: true,
                        update: true
                    }
                },
                billing_data: {
                    $p: {
                        read: true,
                        update: true
                    }
                },
                can_reset_password: {
                    $p: {
                        read: true,
                        update: true
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
