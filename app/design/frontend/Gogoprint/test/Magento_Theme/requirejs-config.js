var config = {
    paths: {
        "jquery.bootstrap": "Magento_Theme/js/bootstrap.min",
        "jquery.slick": "Magento_Theme/js/slick.min",
        "jquery.select2": "Magento_Theme/js/select2.min",
        "jquery.autocomplete": "Magento_Theme/js/jquery.autocomplete.min",
        "jquery.dlmenu": "Magento_Theme/js/jquery.dlmenu",
        "modernizr.custom": "Magento_Theme/js/modernizr.custom"

    },
    shim: {
        'jquery.bootstrap': {
            'deps': ['jquery']
        },
        'jquery.slick': {
            'deps': ['jquery']
        },
        'jquery.select2': {
            'deps': ['jquery']
        },
        'jquery.dlmenu': {
            'deps': ['jquery','modernizr.custom']
        },
        'jquery.autocomplete': {
            'deps': ['jquery']
        }
    }
};
