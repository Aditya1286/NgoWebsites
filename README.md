# NGO Website - AWS S3 Static Hosting

A static NGO website built for testing AWS S3 static website hosting.

## 🌐 Live Demo

**Hosted on AWS S3**: http://aditya-static-website-123.s3-website.eu-north-1.amazonaws.com/

## 📋 Overview

Static website demonstration project showcasing AWS S3 hosting capabilities. Built with HTML, CSS, and JavaScript.

**Purpose**: Learning AWS S3 static hosting configuration and deployment.

## 🏗️ Architecture

- **Hosting**: AWS S3 Static Website
- **Region**: eu-north-1 (Stockholm)
- **Bucket**: aditya-static-website-123

## 🚀 Quick Setup

### 1. Create Bucket & Upload Files
```bash
aws s3 mb s3://aditya-static-website-123 --region eu-north-1
aws s3 sync . s3://aditya-static-website-123 --region eu-north-1
```

### 2. Enable Static Hosting
```bash
aws s3 website s3://aditya-static-website-123 \
  --index-document index.html \
  --error-document error.html
```

### 3. Set Bucket Policy

Create `bucket-policy.json`:
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::aditya-static-website-123/*"
  }]
}
```

Apply:
```bash
aws s3api put-bucket-policy \
  --bucket aditya-static-website-123 \
  --policy file://bucket-policy.json \
  --region eu-north-1
```

### 4. Disable Block Public Access
```bash
aws s3api put-public-access-block \
  --bucket aditya-static-website-123 \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" \
  --region eu-north-1
```

## 📤 Deploy Updates

```bash
aws s3 sync . s3://aditya-static-website-123 --delete --region eu-north-1
```

## 💰 Cost

Estimated: **$0.10 - $2.00/month** for low traffic

## 🛠️ Tech Stack

- HTML5, CSS3, JavaScript
- AWS S3 Static Hosting
- AWS CLI

## 🧹 Cleanup

```bash
aws s3 rm s3://aditya-static-website-123 --recursive --region eu-north-1
aws s3 rb s3://aditya-static-website-123 --region eu-north-1
```

## 👨‍💻 Author

**Aditya** - [@Aditya1286](https://github.com/Aditya1286)

---

**Note**: Testing/demo project for learning AWS S3 static hosting.
