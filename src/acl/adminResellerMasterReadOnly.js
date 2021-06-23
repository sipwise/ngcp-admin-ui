
export default {
    entity: {
        admins: {
            $p: {
                read: true
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
                password: {
                    $p: {
                        update: {
                            $own: 'id'
                        }
                    }
                },
                email: {
                    $p: {
                        read: true
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
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            }
        },
        customercontacts: {
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
        },
        subscriberprofilesets: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            }
        },
        billingprofiles: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            }
        },
        billingnetworks: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            }
        },
        profilepackages: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            }
        },
        invoicetemplates: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            }
        },
        invoices: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            }
        },
        vouchers: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            }
        },
        rewriterulesets: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            }
        },
        ncoslevels: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            }
        },
        soundsets: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            }
        },
        emailtemplates: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            }
        },
        pbxdevices: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            }
        },
        emergencymappingcontainers: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            }
        },
        emergencymappings: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            }
        },
        phonebookentries: {
            $p: {
                read: true
            },
            columns: {
                $p: {
                    read: true
                }
            }
        },
        maliciouscalls: {
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
                $all: true
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
    }
}
