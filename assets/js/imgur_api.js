class ImgurAPI {
    constructor(token) {
        this.baseURL = "https://api.imgur.com/3";
        this.token = token;
    }

    async request(endpoint, method = 'GET', body = null) {
        const headers = {
            'Authorization': `Bearer ${this.token}`,
            //'Content-Type': 'multipart/form-data'
        };

        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method,
            headers,
            body: body
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.data.error || 'API request failed');
        }

        return response.json();
    }

    async uploadImage(image, type, title, description) {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('type', type);
        formData.append('title', title);
        formData.append('description', description);

        const response = await this.request(`/image`, 'POST', formData);
        return response.data;
    }

    async removeImage(imageId) {
        const response = await this.request(`/image/${imageId}`, 'DELETE');
        return response.data;
    }
}
