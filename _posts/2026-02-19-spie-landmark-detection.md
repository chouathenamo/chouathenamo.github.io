---
layout: post
title: "Enhanced Landmark Detection Model in Pelvic Fluoroscopy using 2D/3D Registration Loss"
date: 2026-02-19
venue: "SPIE Medical Imaging 2026"
location: "Vancouver, Canada"
description: "Oral presentation on our work using 2D/3D registration loss to improve landmark detection in pelvic X-rays."
image: public/img/presentations/spie2026.jpg
links:
  paper: https://doi.org/PLACEHOLDER
  slides: https://PLACEHOLDER
---

## Overview

Accurate landmark detection in pelvic fluoroscopy is a key step in automated surgical planning for procedures such as total hip arthroplasty. In this work, we propose an enhanced training objective that incorporates a 2D/3D registration loss to supervise the U-Net landmark detector with geometric constraints derived from the 3D anatomy.

## Key Contributions

- Introduced a differentiable 2D/3D registration loss as an auxiliary training signal for landmark detection.
- Built an end-to-end pipeline using DiffDRR, OpenCV, and a custom Pose Estimation Loss algorithm.
- Demonstrated improved localization accuracy on pelvic fluoroscopy benchmarks compared to standard heatmap regression.

## Presentation Details

This paper was presented as an **oral talk** at SPIE Medical Imaging 2026 in Vancouver, Canada. The work was conducted at the VINE Lab, Vanderbilt University, under the supervision of Dr. Daniel Moyer and Dr. J. Ryan Martin.

*Joint work with Yehyun Suh (equal contribution).*
