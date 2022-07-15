import { memo } from 'react';

import { codeboxIcons } from 'Types';

const FileIcon = ({ file }: { file: codeboxIcons }) => {
    if (file === 'CLOSED DIRECTORY')
        return (
            <svg
                width="1.08rem"
                height="1.08rem"
                viewBox="0 0 15 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M5.867 0L7.333 1.467H13.2C14 1.467 14.667 2.133 14.667 2.933V10.4C14.667 11.2 14 11.867 13.2 11.867H1.467C0.667 12 0 11.333 0 10.533V1.467C0 0.667 0.667 0 1.467 0H5.867V0Z"
                    fill="#64D2FF"
                />
            </svg>
        );

    if (file === 'OPEN DIRECTORY')
        return (
            <svg
                width="1.2rem"
                height="1.3rem"
                viewBox="0 0 18 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.75895 0H6.35755C6.53815 0 6.7123 0.0629999 6.8499 0.17745L8.71073 1.72935H15.079C15.4983 1.72935 15.838 2.06115 15.838 2.47065V2.96415H2.21235C1.84685 2.96415 1.5351 3.21825 1.4663 3.5679L0 11.1174V0.7413C0 0.3318 0.3397 0 0.75895 0ZM2.9627 3.7065C2.79472 3.70625 2.63141 3.76044 2.49834 3.86058C2.36528 3.96072 2.26999 4.10114 2.2274 4.25985L0.248325 11.6718C0.219091 11.7814 0.215955 11.8961 0.239159 12.007C0.262362 12.118 0.311288 12.2223 0.382181 12.3119C0.453074 12.4016 0.544049 12.4741 0.648121 12.5241C0.752194 12.574 0.866598 12.6 0.98255 12.6H14.4588C14.6267 12.6 14.7899 12.5455 14.9227 12.4452C15.0556 12.3449 15.1506 12.2043 15.193 12.0456L17.1731 4.63365C17.2024 4.52405 17.2055 4.40937 17.1823 4.29841C17.1591 4.18744 17.1102 4.08314 17.0393 3.99352C16.9684 3.9039 16.8774 3.83134 16.7733 3.7814C16.6693 3.73146 16.5549 3.70548 16.4389 3.70545H2.96163L2.9627 3.7065Z"
                    fill="#6CC7F6"
                />
            </svg>
        );

    if (file === 'cpp')
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="1.3rem"
                height="1.3rem"
                fill-rule="evenodd"
                clip-rule="evenodd"
            >
                <path
                    fill="#00549d"
                    fill-rule="evenodd"
                    d="M22.903,3.286c0.679-0.381,1.515-0.381,2.193,0 c3.355,1.883,13.451,7.551,16.807,9.434C42.582,13.1,43,13.804,43,14.566c0,3.766,0,15.101,0,18.867 c0,0.762-0.418,1.466-1.097,1.847c-3.355,1.883-13.451,7.551-16.807,9.434c-0.679,0.381-1.515,0.381-2.193,0 c-3.355-1.883-13.451-7.551-16.807-9.434C5.418,34.899,5,34.196,5,33.434c0-3.766,0-15.101,0-18.867 c0-0.762,0.418-1.466,1.097-1.847C9.451,10.837,19.549,5.169,22.903,3.286z"
                    clip-rule="evenodd"
                />
                <path
                    fill="#0086d4"
                    fill-rule="evenodd"
                    d="M5.304,34.404C5.038,34.048,5,33.71,5,33.255 c0-3.744,0-15.014,0-18.759c0-0.758,0.417-1.458,1.094-1.836c3.343-1.872,13.405-7.507,16.748-9.38 c0.677-0.379,1.594-0.371,2.271,0.008c3.343,1.872,13.371,7.459,16.714,9.331c0.27,0.152,0.476,0.335,0.66,0.576L5.304,34.404z"
                    clip-rule="evenodd"
                />
                <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M24,10c7.727,0,14,6.273,14,14s-6.273,14-14,14 s-14-6.273-14-14S16.273,10,24,10z M24,17c3.863,0,7,3.136,7,7c0,3.863-3.137,7-7,7s-7-3.137-7-7C17,20.136,20.136,17,24,17z"
                    clip-rule="evenodd"
                />
                <path
                    fill="#0075c0"
                    fill-rule="evenodd"
                    d="M42.485,13.205c0.516,0.483,0.506,1.211,0.506,1.784 c0,3.795-0.032,14.589,0.009,18.384c0.004,0.396-0.127,0.813-0.323,1.127L23.593,24L42.485,13.205z"
                    clip-rule="evenodd"
                />
                <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M31 21H33V27H31zM38 21H40V27H38z"
                    clip-rule="evenodd"
                />
                <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M29 23H35V25H29zM36 23H42V25H36z"
                    clip-rule="evenodd"
                />
            </svg>
        );

    if (file === 'py')
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="1.3rem"
                height="1.3rem"
            >
                <path
                    fill="#0277BD"
                    d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z"
                />
                <path
                    fill="#FFC107"
                    d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549-2.077,4.549-4.67V34h-9v-2h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c0.826-3.417,0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104c0,2.966-2.686,5.896-5.764,5.896h-7.236c-2.523,0-5,1.862-5,4.377v8.586c0,2.439,1.759,4.263,4.218,4.672C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5-1.498c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z"
                />
            </svg>
        );

    if (file === 'js')
        return (
            <svg
                width="1.3rem"
                height="1.3rem"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="m3 3h18v18h-18v-18m4.73 15.04c.4.85 1.19 1.55 2.54 1.55 1.5 0 2.53-.8 2.53-2.55v-5.78h-1.7v5.74c0 .86-.35 1.08-.9 1.08-.58 0-.82-.4-1.09-.87l-1.38.83m5.98-.18c.5.98 1.51 1.73 3.09 1.73 1.6 0 2.8-.83 2.8-2.36 0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.73.81-.73.48 0 .8.21 1.09.73l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33-1.51 0-2.48.96-2.48 2.23 0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13 0 .48-.45.83-1.15.83-.83 0-1.31-.43-1.67-1.03l-1.38.8z"
                    fill="#ffca28"
                />
            </svg>
        );

    if (file === 'ts')
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="1.3rem"
                height="1.3rem"
            >
                <rect width="36" height="36" x="6" y="6" fill="#1976d2" />
                <polygon
                    fill="#fff"
                    points="27.49,22 14.227,22 14.227,25.264 18.984,25.264 18.984,40 22.753,40 22.753,25.264 27.49,25.264"
                />
                <path
                    fill="#fff"
                    d="M39.194,26.084c0,0-1.787-1.192-3.807-1.192s-2.747,0.96-2.747,1.986 c0,2.648,7.381,2.383,7.381,7.712c0,8.209-11.254,4.568-11.254,4.568V35.22c0,0,2.152,1.622,4.733,1.622s2.483-1.688,2.483-1.92 c0-2.449-7.315-2.449-7.315-7.878c0-7.381,10.658-4.469,10.658-4.469L39.194,26.084z"
                />
            </svg>
        );

    if (file === 'html')
        return (
            <svg
                width="1.3rem"
                height="1.3rem"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="m12 17.56l4.07-1.13.55-6.1h-7.24l-.18-2.03h7.6l.2-1.99h-10l.56 6.01h6.89l-.23 2.58-2.22.6-2.22-.6-.14-1.66h-2l.29 3.19 4.07 1.13m-7.93-14.56h15.86l-1.43 16.2-6.5 1.8-6.5-1.8-1.43-16.2z"
                    fill="#e44d26"
                />
            </svg>
        );

    if (file === 'css')
        return (
            <svg
                width="1.3rem"
                height="1.3rem"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="m5 3l-.65 3.34h13.59l-.44 2.16h-13.58l-.66 3.33h13.59l-.76 3.81-5.48 1.81-4.75-1.81.33-1.64h-3.34l-.79 4 7.85 3 9.05-3 1.2-6.03.24-1.21 1.54-7.76h-16.94z"
                    fill="#42a5f5"
                />
            </svg>
        );

    if (file === 'tsx')
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="1.3rem"
                height="1.3rem"
            >
                <path
                    fill="#8bb7f0"
                    d="M17.5,15c0,1.382-1.118,2.5-2.5,2.5s-2.5-1.118-2.5-2.5s1.118-2.5,2.5-2.5S17.5,13.618,17.5,15z"
                />
                <path
                    fill="#4e7ab5"
                    d="M15,18c-1.654,0-3-1.346-3-3s1.346-3,3-3s3,1.346,3,3S16.654,18,15,18z M15,13c-1.103,0-2,0.897-2,2 s0.897,2,2,2s2-0.897,2-2S16.103,13,15,13z"
                />
                <g>
                    <path
                        fill="#8bb7f0"
                        d="M29.5,15c0-2.152-2.095-3.993-5.455-5.166c0.748-3.603,0.877-6.337-1.688-7.856 c-0.535-0.316-1.145-0.477-1.812-0.477c-1.647,0-3.589,1.002-5.544,2.746c-1.956-1.746-3.899-2.749-5.547-2.749 c-0.667,0-1.276,0.161-1.811,0.477C6.018,2.939,4.971,5.092,5.955,9.834C2.595,11.008,0.5,12.848,0.5,15s2.095,3.992,5.455,5.166 c-0.779,3.755-0.724,6.428,1.689,7.859c0.535,0.316,1.145,0.477,1.812,0.477c1.647,0,3.59-1.002,5.545-2.748 c1.955,1.744,3.897,2.745,5.544,2.745h0.001c0.667,0,1.276-0.161,1.812-0.477c2.39-1.416,2.49-3.994,1.688-7.856 C27.405,18.993,29.5,17.152,29.5,15z M21.337,3.699c1.513,0.896,1.325,2.682,0.767,5.563c-1.002-0.242-2.087-0.428-3.231-0.56 c-0.787-1.123-1.605-2.143-2.435-3.037c1.618-1.42,3.086-2.163,4.107-2.163C20.854,3.501,21.112,3.566,21.337,3.699z M21.2,17.474 c0.157,0.443,0.294,0.874,0.419,1.298c-0.416,0.102-0.849,0.195-1.298,0.278c0.135-0.227,0.271-0.452,0.402-0.686 C20.886,18.071,21.043,17.772,21.2,17.474z M18.979,17.382c-0.403,0.716-0.818,1.383-1.236,2.018 c-0.878,0.078-1.793,0.123-2.743,0.123c-0.952,0-1.87-0.045-2.749-0.123c-0.418-0.633-0.83-1.305-1.232-2.018 c-0.452-0.803-0.856-1.6-1.216-2.382c0.359-0.782,0.764-1.579,1.216-2.382c0.402-0.713,0.814-1.385,1.233-2.018 c0.88-0.078,1.797-0.123,2.749-0.123c0.952,0,1.868,0.045,2.748,0.123c0.418,0.633,0.83,1.305,1.232,2.018 c0.452,0.803,0.857,1.6,1.216,2.382C19.836,15.782,19.431,16.579,18.979,17.382z M15.001,22.936 c-0.408-0.44-0.819-0.922-1.231-1.439c0.406,0.014,0.813,0.026,1.23,0.026c0.417,0,0.825-0.012,1.231-0.026 C15.819,22.016,15.409,22.496,15.001,22.936z M9.276,18.363c0.131,0.233,0.267,0.458,0.402,0.685 c-0.449-0.083-0.881-0.176-1.297-0.278c0.125-0.423,0.262-0.854,0.418-1.297C8.956,17.773,9.112,18.071,9.276,18.363z M8.799,12.526c-0.156-0.442-0.293-0.873-0.418-1.297c0.416-0.101,0.848-0.194,1.298-0.278c-0.135,0.227-0.271,0.452-0.402,0.685 C9.112,11.929,8.956,12.227,8.799,12.526z M15.001,7.066c0.407,0.439,0.818,0.921,1.228,1.438C15.823,8.489,15.416,8.477,15,8.477 c-0.416,0-0.823,0.012-1.229,0.026C14.182,7.986,14.593,7.505,15.001,7.066z M20.722,11.637c-0.131-0.234-0.267-0.458-0.402-0.686 c0.45,0.083,0.882,0.176,1.299,0.278c-0.125,0.424-0.262,0.855-0.419,1.298C21.043,12.228,20.886,11.929,20.722,11.637z M8.663,3.696c0.225-0.133,0.483-0.198,0.791-0.198c1.022,0,2.491,0.744,4.11,2.165c-0.83,0.894-1.649,1.914-2.437,3.038 C9.983,8.834,8.898,9.02,7.896,9.262C7.115,5.232,8.076,4.045,8.663,3.696z M2.5,15c0-1.128,1.501-2.322,3.961-3.202 C6.776,12.855,7.167,13.93,7.624,15c-0.456,1.07-0.847,2.145-1.163,3.202C4.001,17.322,2.5,16.128,2.5,15z M8.663,26.304 c-1.363-0.808-1.355-2.531-0.767-5.566c1.002,0.242,2.086,0.428,3.23,0.56c0.789,1.126,1.61,2.148,2.442,3.044 C11.474,26.181,9.63,26.877,8.663,26.304z M21.337,26.301c-0.225,0.133-0.483,0.198-0.792,0.198c-1.022,0-2.49-0.743-4.108-2.162 c0.83-0.894,1.648-1.914,2.436-3.038c1.144-0.133,2.229-0.318,3.231-0.56C22.712,23.881,22.678,25.507,21.337,26.301z M23.538,18.202c-0.316-1.056-0.707-2.132-1.163-3.202c0.457-1.07,0.848-2.146,1.164-3.202C25.999,12.678,27.5,13.872,27.5,15 C27.5,16.128,25.999,17.322,23.538,18.202z"
                    />
                    <path
                        fill="#4e7ab5"
                        d="M9.455,29.001c-0.758,0-1.452-0.184-2.066-0.547c-2.36-1.399-2.775-3.831-2.007-7.965 C1.955,19.198,0,17.212,0,15s1.955-4.198,5.382-5.49C4.428,4.377,5.797,2.489,7.389,1.545c1.944-1.151,4.709-0.434,7.612,2.038 c2.901-2.47,5.661-3.187,7.61-2.036c2.51,1.486,2.747,3.982,2.007,7.962C28.045,10.802,30,12.789,30,15s-1.955,4.198-5.383,5.49 c0.789,4.243,0.334,6.577-2.006,7.962c-1.949,1.151-4.709,0.434-7.611-2.035C13.013,28.109,11.103,29.001,9.455,29.001z M9.454,1.999c-0.576,0-1.1,0.137-1.556,0.407C6.056,3.498,5.753,6.403,6.444,9.732l0.09,0.429L6.12,10.306 C2.866,11.442,1,13.153,1,15s1.866,3.558,5.12,4.694l0.414,0.145l-0.09,0.429c-0.486,2.342-1.175,5.768,1.454,7.327 c1.622,0.959,4.134,0.14,6.769-2.213L15,25.084l0.333,0.297c2.636,2.351,5.147,3.168,6.769,2.211 c2.606-1.544,1.962-4.875,1.453-7.324l-0.09-0.429l0.414-0.145C27.134,18.558,29,16.847,29,15s-1.866-3.558-5.12-4.694 l-0.414-0.145l0.09-0.429c0.455-2.189,1.328-5.677-1.454-7.324c-1.621-0.959-4.133-0.14-6.768,2.212l-0.333,0.297L14.668,4.62 C12.774,2.93,10.923,1.999,9.454,1.999z M9.455,26.999c-0.397,0-0.75-0.089-1.047-0.265c-1.57-0.931-1.647-2.764-1.004-6.091 l0.1-0.514l0.509,0.123c0.961,0.232,2.027,0.417,3.17,0.549l0.223,0.026l0.129,0.184c0.775,1.105,1.583,2.111,2.399,2.99 l0.35,0.376l-0.386,0.339C12.223,26.189,10.645,26.999,9.455,26.999z M8.295,21.343c-0.488,2.985-0.297,3.985,0.623,4.531 c0.141,0.083,0.321,0.125,0.537,0.125c0.851,0,2.071-0.616,3.395-1.703c-0.682-0.766-1.354-1.613-2.005-2.527 C9.944,21.658,9.09,21.515,8.295,21.343z M20.545,26.999c-1.181,0-2.757-0.812-4.438-2.286l-0.386-0.339l0.349-0.377 c0.816-0.88,1.621-1.884,2.394-2.985l0.129-0.184l0.223-0.026c1.144-0.133,2.211-0.318,3.171-0.55l0.509-0.123l0.1,0.514 c0.665,3.435,0.545,5.171-1.003,6.088C21.287,26.912,20.945,26.999,20.545,26.999z M17.155,24.291 c1.672,1.374,3.211,2.005,3.927,1.581c0.902-0.534,1.128-1.434,0.622-4.528c-0.795,0.172-1.649,0.315-2.551,0.426 C18.505,22.68,17.835,23.525,17.155,24.291z M15.001,23.671l-0.366-0.395c-0.409-0.441-0.832-0.935-1.256-1.468l-0.673-0.847 l1.081,0.037c0.801,0.026,1.627,0.027,2.426,0l1.08-0.038l-0.671,0.848c-0.413,0.523-0.835,1.017-1.254,1.469L15.001,23.671z M15,20.023c-0.922,0-1.861-0.042-2.794-0.125l-0.239-0.021l-0.133-0.201c-0.44-0.667-0.861-1.355-1.251-2.048 c-0.444-0.789-0.859-1.602-1.234-2.418L9.253,15l0.096-0.208c0.375-0.816,0.79-1.63,1.234-2.419 c0.388-0.689,0.809-1.378,1.251-2.047l0.133-0.201l0.239-0.021c1.862-0.166,3.716-0.167,5.586,0l0.24,0.021l0.133,0.201 c0.438,0.664,0.859,1.354,1.25,2.048c0.444,0.789,0.859,1.602,1.234,2.418L20.745,15l-0.096,0.208 c-0.375,0.816-0.79,1.63-1.234,2.419c-0.379,0.672-0.789,1.342-1.255,2.048l-0.133,0.201l-0.24,0.021 C16.859,19.981,15.921,20.023,15,20.023z M12.536,18.922c1.646,0.134,3.281,0.134,4.922,0.001c0.398-0.612,0.755-1.199,1.086-1.786 c0.393-0.698,0.763-1.416,1.101-2.137c-0.338-0.721-0.708-1.439-1.101-2.136c-0.34-0.604-0.703-1.204-1.081-1.786 c-1.652-0.134-3.282-0.134-4.927,0c-0.381,0.586-0.744,1.186-1.082,1.785c-0.393,0.698-0.763,1.416-1.101,2.137 c0.338,0.721,0.708,1.439,1.101,2.136C11.793,17.738,12.156,18.338,12.536,18.922z M10.665,19.741l-1.079-0.2 c-0.458-0.085-0.898-0.18-1.323-0.284l-0.51-0.125l0.148-0.503c0.127-0.432,0.267-0.871,0.426-1.322l0.382-1.082l0.533,1.017 c0.153,0.294,0.309,0.588,0.47,0.876c0.092,0.162,0.186,0.321,0.279,0.479L10.665,19.741z M19.327,19.74l0.642-1.08 c0.106-0.18,0.213-0.359,0.317-0.543c0.159-0.282,0.31-0.569,0.46-0.857l0.531-1.014l0.393,1.06 c0.161,0.452,0.301,0.892,0.428,1.323l0.148,0.503l-0.51,0.125c-0.425,0.104-0.866,0.199-1.326,0.284L19.327,19.74z M23.21,18.851 l-0.151-0.505c-0.307-1.029-0.691-2.089-1.144-3.149L21.831,15l0.084-0.196c0.448-1.048,0.833-2.108,1.146-3.149l0.15-0.504 l0.496,0.177C26.436,12.303,28,13.641,28,15c0,1.358-1.565,2.697-4.294,3.673L23.21,18.851z M22.918,15 c0.357,0.855,0.673,1.709,0.941,2.547C26.166,16.634,27,15.619,27,15s-0.834-1.634-3.141-2.547 C23.589,13.299,23.273,14.153,22.918,15z M6.789,18.85l-0.496-0.178C3.564,17.697,2,16.359,2,15s1.564-2.697,4.293-3.672 l0.496-0.178l0.151,0.505c0.31,1.038,0.694,2.097,1.144,3.148L8.168,15l-0.084,0.196c-0.449,1.052-0.834,2.111-1.144,3.148 L6.789,18.85z M6.14,12.453C3.834,13.366,3,14.381,3,15s0.834,1.634,3.14,2.547C6.409,16.703,6.725,15.85,7.081,15 C6.725,14.15,6.409,13.297,6.14,12.453z M8.709,13.774l-0.382-1.082c-0.159-0.451-0.299-0.89-0.426-1.322l-0.148-0.503l0.51-0.125 c0.425-0.104,0.865-0.198,1.325-0.284l1.082-0.201l-0.654,1.105c-0.103,0.171-0.204,0.342-0.304,0.519 c-0.161,0.287-0.316,0.581-0.47,0.875L8.709,13.774z M21.287,13.772l-0.531-1.014c-0.16-0.306-0.311-0.594-0.47-0.876 c-0.104-0.184-0.211-0.363-0.317-0.543l-0.642-1.08l1.083,0.2c0.46,0.085,0.901,0.18,1.326,0.284l0.51,0.125l-0.148,0.503 c-0.127,0.432-0.267,0.872-0.428,1.323L21.287,13.772z M7.504,9.871l-0.1-0.514C6.569,5.035,7.612,3.738,8.408,3.266 c1.208-0.713,3.235,0.047,5.485,2.022l0.386,0.339l-0.35,0.377c-0.814,0.877-1.62,1.882-2.394,2.985l-0.129,0.184l-0.223,0.026 c-1.144,0.132-2.21,0.317-3.172,0.549L7.504,9.871z M9.454,3.999c-0.218,0-0.389,0.041-0.536,0.128 C8.745,4.229,7.641,4.662,8.295,8.657c0.796-0.173,1.651-0.315,2.552-0.426c0.648-0.912,1.319-1.757,1.999-2.521 C11.53,4.631,10.284,3.999,9.454,3.999z M22.495,9.871l-0.509-0.123c-0.96-0.232-2.027-0.417-3.171-0.55l-0.223-0.026l-0.129-0.184 c-0.776-1.106-1.581-2.11-2.393-2.984l-0.351-0.377l0.387-0.339c2.251-1.975,4.279-2.732,5.484-2.02 c1.721,1.019,1.618,2.915,1.003,6.088L22.495,9.871z M19.153,8.231c0.901,0.111,1.756,0.254,2.551,0.426 c0.464-2.827,0.445-3.897-0.622-4.528c-0.717-0.424-2.254,0.207-3.927,1.582C17.833,6.472,18.503,7.317,19.153,8.231z M12.706,9.039l0.674-0.848c0.429-0.538,0.851-1.031,1.255-1.466l0.367-0.396l0.366,0.396c0.414,0.448,0.835,0.941,1.252,1.466 l0.673,0.847l-1.081-0.037c-0.801-0.026-1.623-0.026-2.424,0L12.706,9.039z"
                    />
                </g>
            </svg>
        );

    if (file === 'jsx')
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="1.3rem"
                height="1.3rem"
            >
                <path
                    fill="#80deea"
                    d="M24,34C11.1,34,1,29.6,1,24c0-5.6,10.1-10,23-10c12.9,0,23,4.4,23,10C47,29.6,36.9,34,24,34z M24,16	c-12.6,0-21,4.1-21,8c0,3.9,8.4,8,21,8s21-4.1,21-8C45,20.1,36.6,16,24,16z"
                />
                <path
                    fill="#80deea"
                    d="M15.1,44.6c-1,0-1.8-0.2-2.6-0.7C7.6,41.1,8.9,30.2,15.3,19l0,0c3-5.2,6.7-9.6,10.3-12.4c3.9-3,7.4-3.9,9.8-2.5	c2.5,1.4,3.4,4.9,2.8,9.8c-0.6,4.6-2.6,10-5.6,15.2c-3,5.2-6.7,9.6-10.3,12.4C19.7,43.5,17.2,44.6,15.1,44.6z M32.9,5.4	c-1.6,0-3.7,0.9-6,2.7c-3.4,2.7-6.9,6.9-9.8,11.9l0,0c-6.3,10.9-6.9,20.3-3.6,22.2c1.7,1,4.5,0.1,7.6-2.3c3.4-2.7,6.9-6.9,9.8-11.9	c2.9-5,4.8-10.1,5.4-14.4c0.5-4-0.1-6.8-1.8-7.8C34,5.6,33.5,5.4,32.9,5.4z"
                />
                <path
                    fill="#80deea"
                    d="M33,44.6c-5,0-12.2-6.1-17.6-15.6C8.9,17.8,7.6,6.9,12.5,4.1l0,0C17.4,1.3,26.2,7.8,32.7,19	c3,5.2,5,10.6,5.6,15.2c0.7,4.9-0.3,8.3-2.8,9.8C34.7,44.4,33.9,44.6,33,44.6z M13.5,5.8c-3.3,1.9-2.7,11.3,3.6,22.2	c6.3,10.9,14.1,16.1,17.4,14.2c1.7-1,2.3-3.8,1.8-7.8c-0.6-4.3-2.5-9.4-5.4-14.4C24.6,9.1,16.8,3.9,13.5,5.8L13.5,5.8z"
                />
                <circle cx="24" cy="24" r="4" fill="#80deea" />
            </svg>
        );

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="1.3rem"
                height="1.3rem"
            >
                <polygon
                    fill="#f5bc00"
                    points="21,12 21,8 4,8 4,40 44,40 44,12"
                />
                <polygon fill="#f55376" points="35.5,26 24,45 47,45" />
                <polygon fill="#eb0000" points="35.5,26 27.026,40 43.974,40" />
                <rect width="3" height="6" x="34" y="32" fill="#fac8d5" />
                <rect width="3" height="3" x="34" y="40" fill="#fac8d5" />
            </svg>
        </>
    );
};

export default memo(FileIcon);
