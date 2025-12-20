# YellowBooks Deployment Guide (EKS)

This document describes how the YellowBooks web application is deployed on AWS EKS
with OIDC authentication, Ingress + TLS, CI/CD, database migration, and autoscaling.

---

## 1️⃣ IAM OIDC Setup (OIDC + Roles)

### 1.1 Check OIDC issuer
```bash
aws eks describe-cluster \
  --name yellowbooks-cluster \
  --query "cluster.identity.oidc.issuer" \
  --output text
