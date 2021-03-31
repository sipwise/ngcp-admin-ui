
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
        }
    }
}