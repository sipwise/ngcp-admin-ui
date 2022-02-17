import {
    aclCan,
    aclSet
} from 'src/acl'

describe('ACL', function () {
    it('should return false for invalid input', function () {
        aclSet({})
        expect(aclCan(undefined, undefined)).toBeFalsy()
        expect(aclCan(null, null)).toBeFalsy()
        expect(aclCan(1234, 1234)).toBeFalsy()
        expect(aclCan(NaN, NaN)).toBeFalsy()
        expect(aclCan(true, true)).toBeFalsy()
        expect(aclCan(false, false)).toBeFalsy()
        expect(aclCan('', '')).toBeFalsy()
        expect(aclCan(() => {}, () => {})).toBeFalsy()
    })

    it('should return false for none-existing resource operations', function () {
        aclSet({})
        expect(aclCan('create', 'entity')).toBeFalsy()
        expect(aclCan('read', 'entity.admins')).toBeFalsy()
        expect(aclCan('update', 'entity.admins.columns')).toBeFalsy()
        expect(aclCan('delete', 'entity.admins.columns.login')).toBeFalsy()
    })

    it('should return the value for an existing resource operation', function () {
        aclSet({
            entity: {
                admins: {
                    $p: {
                        create: false,
                        update: true
                    }
                }
            }
        })
        expect(aclCan('create', 'entity.admins')).toBeFalsy()
        expect(aclCan('update', 'entity.admins')).toBeTruthy()
    })

    it('should return true for $all possible operations', function () {
        aclSet({
            entity: {
                admins: {
                    $p: {
                        $all: true
                    }
                }
            }
        })
        expect(aclCan('create', 'entity.admins')).toBeTruthy()
        expect(aclCan('read', 'entity.admins')).toBeTruthy()
        expect(aclCan('update', 'entity.admins')).toBeTruthy()
        expect(aclCan('delete', 'entity.admins')).toBeTruthy()
    })

    it('should return false for $all possible operations', function () {
        aclSet({
            entity: {
                admins: {
                    $p: {
                        $all: false
                    }
                }
            }
        })
        expect(aclCan('create', 'entity.admins')).toBeFalsy()
        expect(aclCan('read', 'entity.admins')).toBeFalsy()
        expect(aclCan('update', 'entity.admins')).toBeFalsy()
        expect(aclCan('delete', 'entity.admins')).toBeFalsy()
    })

    it('should prioritize the own $all higher then the parents $all', function () {
        aclSet({
            entity: {
                $p: {
                    $all: true
                },
                admins: {
                    $p: {
                        $all: false
                    }
                }
            }
        })
        expect(aclCan('create', 'entity.admins')).toBeFalsy()
        expect(aclCan('create', 'entity.resellers')).toBeTruthy()
    })

    it('should prioritize concrete permissions higher then $all', function () {
        aclSet({
            entity: {
                admins: {
                    $p: {
                        $all: false,
                        create: true
                    }
                }
            }
        })
        expect(aclCan('create', 'entity.admins')).toBeTruthy()
        expect(aclCan('read', 'entity.admins')).toBeFalsy()
        expect(aclCan('update', 'entity.admins')).toBeFalsy()
        expect(aclCan('delete', 'entity.admins')).toBeFalsy()
    })

    it('should pass down permissions to none-present sub-resources', function () {
        aclSet({
            entity: {
                $p: {
                    $all: true
                }
            }
        })
        expect(aclCan('create', 'entity.admins')).toBeTruthy()
        expect(aclCan('read', 'entity.customers')).toBeTruthy()
        expect(aclCan('update', 'entity.resellers')).toBeTruthy()
        expect(aclCan('delete', 'entity.domains')).toBeTruthy()
    })

    it('should allow access to owned objects', function () {
        aclSet({
            entity: {
                admins: {
                    $p: {
                        delete: {
                            $own: 'id'
                        }
                    }
                }
            }
        })
        expect(aclCan('delete', 'entity.admins', {
            id: 123
        }, {
            id: 123
        })).toBeTruthy()
        expect(aclCan('delete', 'entity.admins', {
            id: '123'
        }, {
            id: 123
        })).toBeTruthy()
        expect(aclCan('delete', 'entity.admins', {
            id: 123
        }, {
            id: 456
        })).toBeFalsy()
        expect(aclCan('delete', 'entity.admins', {
            id: 456
        }, {
            id: 123
        })).toBeFalsy()
    })

    it('should allow access to owned objects and $all operations', function () {
        aclSet({
            entity: {
                admins: {
                    $p: {
                        $all: {
                            $own: 'id'
                        }
                    }
                }
            }
        })
        expect(aclCan('create', 'entity.admins', {
            id: 123
        }, {
            id: 123
        })).toBeTruthy()
        expect(aclCan('read', 'entity.admins', {
            id: 123
        }, {
            id: 123
        })).toBeTruthy()
        expect(aclCan('update', 'entity.admins', {
            id: 123
        }, {
            id: 456
        })).toBeFalsy()
        expect(aclCan('delete', 'entity.admins', {
            id: 123
        }, {
            id: 456
        })).toBeFalsy()
    })

    it('should not allow access to owned objects with wrong $own', function () {
        aclSet({
            entity: {
                admins: {
                    $p: {
                        delete: {
                            $own: 'user_id'
                        }
                    }
                }
            }
        })
        expect(aclCan('delete', 'entity.admins', {
            id: 123
        }, {
            id: 123
        })).toBeFalsy()
        expect(aclCan('delete', 'entity.admins', {
            id: '123'
        }, {
            id: 123
        })).toBeFalsy()
        expect(aclCan('delete', 'entity.admins', {
            id: 123
        }, {
            id: 456
        })).toBeFalsy()
        expect(aclCan('delete', 'entity.admins', {
            id: 456
        }, {
            id: 123
        })).toBeFalsy()
    })

    it('should accept multiple resources delivered as an array', function () {
        aclSet({
            entity: {
                admins: {
                    $p: {
                        read: true,
                        update: true
                    }
                },
                resellers: {
                    $p: {
                        create: true,
                        read: true
                    }
                }
            }
        })
        expect(aclCan('read', [
            'entity.admins',
            'entity.resellers'
        ])).toBeTruthy()
        expect(aclCan('update', [
            'entity.admins',
            'entity.resellers'
        ])).toBeFalsy()
        expect(aclCan('create', [
            'entity.admins',
            'entity.resellers'
        ])).toBeFalsy()
    })

    it('should accept multiple operations delivered as an array', function () {
        aclSet({
            entity: {
                admins: {
                    $p: {
                        read: true,
                        update: true
                    }
                }
            }
        })
        expect(aclCan([
            'read',
            'update'
        ], 'entity.admins')).toBeTruthy()
        expect(aclCan([
            'create',
            'delete'
        ], 'entity.admins')).toBeFalsy()
    })

    it('should accept multiple operations and resources delivered as arrays', function () {
        aclSet({
            entity: {
                admins: {
                    $p: {
                        read: true,
                        update: true
                    }
                },
                resellers: {
                    $p: {
                        read: true,
                        update: true
                    }
                },
                customers: {
                    $p: {
                        read: true,
                        delete: true
                    }
                }
            }
        })
        expect(aclCan([
            'read',
            'update'
        ], [
            'entity.admins',
            'entity.resellers'
        ])).toBeTruthy()
        expect(aclCan([
            'read',
            'delete'
        ], [
            'entity.admins',
            'entity.customers'
        ])).toBeFalsy()
    })

    it('should successfully check for existence with one sub-resource and sufficient permission', function () {
        aclSet({
            entity: {
                admins: {
                    $p: {
                        read: true
                    }
                }
            }
        })
        expect(aclCan('read', 'entity.$hasChildTrue')).toBeTruthy()
        expect(aclCan('read', 'tool.$hasChildTrue')).toBeFalsy()
    })

    it('should successfully check for existence with one sub-resource and insufficient permission', function () {
        aclSet({
            entity: {
                admins: {
                    $p: {
                        read: false
                    }
                }
            }
        })
        expect(aclCan('read', 'entity.$hasChildTrue')).toBeFalsy()
        expect(aclCan('read', 'tool.$hasChildTrue')).toBeFalsy()
    })

    it('should successfully check for existence with n sub-resources and unequal permissions', function () {
        aclSet({
            entity: {
                admins: {
                    $p: {
                        read: true
                    }
                },
                customers: {
                    $p: {
                        read: false
                    }
                }
            }
        })
        expect(aclCan('read', 'entity.$hasChildTrue')).toBeTruthy()
        expect(aclCan('read', 'tool.$hasChildTrue')).toBeFalsy()
    })

    it('should successfully check for existence with n sub-resources and equal permissions', function () {
        aclSet({
            entity: {
                admins: {
                    $p: {
                        read: true
                    }
                },
                customers: {
                    $p: {
                        read: true
                    }
                }
            }
        })
        expect(aclCan('read', 'entity.$hasChildTrue')).toBeTruthy()
        expect(aclCan('read', 'tool.$hasChildTrue')).toBeFalsy()
    })

    it('should successfully check for sub-resources to be present by using $hasChildTrue and $all', function () {
        aclSet({
            entity: {
                admins: {
                    $p: {
                        $all: true
                    }
                }
            }
        })
        expect(aclCan('read', 'entity.$hasChildTrue')).toBeTruthy()
        expect(aclCan('read', 'tool.$hasChildTrue')).toBeFalsy()
    })

    it('should fail checking for sub-resources by using $hasChildTrue', function () {
        aclSet({
            entity: {}
        })
        expect(aclCan('read', 'entity.$hasChildTrue')).toBeFalsy()
        expect(aclCan('read', 'tool.$hasChildTrue')).toBeFalsy()
    })
})
