// https://nuxt.com/docs/guide/directory-structure/app-config
export default defineAppConfig({
  ui: {
    primary: 'slate',
    gray: 'slate',
    button: {
      default: {
        color: 'slate',
        variant: 'ghost',
        loadingIcon: 'i-octicon-sync-24',
        class: 'font-medium transition-transform duration-300 active:scale-95'
      }
    },
    input: {
      default: {
        color: 'slate',
        loadingIcon: 'i-octicon-sync-24',
        class: 'transition-colors duration-300'
      }
    },
    inputMenu: {
      default: {
        selectedIcon: 'i-octicon-check-24',
        trailingIcon: 'i-octicon-chevron-down-24'
      }
    },
    select: {
      default: {
        color: 'slate',
        loadingIcon: 'i-octicon-sync-24',
        trailingIcon: 'i-octicon-chevron-down-24',
        class: 'transition-colors duration-300'
      }
    },
    selectMenu: {
      default: {
        selectedIcon: 'i-octicon-check-24',
        class: 'backdrop-blur-lg'
      }
    },
    notification: {
      default: {
        color: 'slate',
        closeButton: {
          icon: 'i-octicon-x-24',
          class: 'hover:rotate-90 transition-transform duration-300'
        }
      }
    },
    commandPalette: {
      default: {
        icon: 'i-octicon-search-24',
        loadingIcon: 'i-octicon-sync-24',
        selectedIcon: 'i-octicon-check-24',
        emptyState: {
          icon: 'i-octicon-search-24'
        },
        class: 'backdrop-blur-xl'
      }
    },
    table: {
      default: {
        sortAscIcon: 'i-octicon-sort-asc-24',
        sortDescIcon: 'i-octicon-sort-desc-24',
        sortButton: {
          icon: 'i-octicon-arrow-switch-24'
        },
        expandButton: {
          icon: 'i-octicon-chevron-down-24'
        },
        loadingState: {
          icon: 'i-octicon-sync-24'
        },
        emptyState: {
          icon: 'i-octicon-database-24'
        }
      }
    },
    pagination: {
      default: {
        color: 'slate',
        firstButton: {
          icon: 'i-octicon-chevron-left-24'
        },
        prevButton: {
          icon: 'i-octicon-arrow-left-24'
        },
        nextButton: {
          icon: 'i-octicon-arrow-right-24'
        },
        lastButton: {
          icon: 'i-octicon-chevron-right-24'
        }
      }
    },
    accordion: {
      default: {
        color: 'slate',
        openIcon: 'i-octicon-chevron-down-24',
        class: 'transition-all duration-300'
      }
    },
    breadcrumb: {
      default: {
        divider: 'i-octicon-chevron-right-24'
      }
    },
    carousel: {
      default: {
        prevButton: {
          icon: 'i-octicon-chevron-left-24'
        },
        nextButton: {
          icon: 'i-octicon-chevron-right-24'
        }
      }
    },
    toggle: {
      default: {
        color: 'slate',
        loadingIcon: 'i-octicon-sync-24',
        class: 'transition-colors duration-300'
      }
    }
  }
})