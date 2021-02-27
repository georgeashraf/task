const PROXY_CONFIG = [
    {
        context: [
            "/index",
            "/auth"
        ],
        target: "http://localhost:8000",
        secure: false
    }
]

module.exports = PROXY_CONFIG;