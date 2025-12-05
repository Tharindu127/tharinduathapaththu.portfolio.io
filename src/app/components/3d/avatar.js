'use client'
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const AdvancedThreeDAvatar = ({ onInteract }) => {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const controlsRef = useRef(null);
    const animationFrameRef = useRef(null);
    const modelRef = useRef(null);
    const mixerRef = useRef(null);
    const clockRef = useRef(new THREE.Clock());

    const [modelLoaded, setModelLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadingError, setLoadingError] = useState(null);

    // Initialize the scene
    useEffect(() => {
        if (!containerRef.current) return;

        // Create scene with nice background
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Optional: Add ambient environment light
        const envLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
        scene.add(envLight);

        // Create camera
        const camera = new THREE.PerspectiveCamera(
            45,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 1.5, 3); // Position camera to better view a human model
        cameraRef.current = camera;

        // Create renderer with physically correct lighting
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        renderer.setClearColor(0x000000, 0); // Transparent background
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Add orbit controls with limits
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.minDistance = 1.5;
        controls.maxDistance = 5;
        controls.maxPolarAngle = Math.PI / 1.8; // Limit rotation so can't look under the floor
        controls.target.set(0, 1, 0); // Look at the center of character
        controls.update();
        controlsRef.current = controls;

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Main front light (key light)
        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(5, 5, 5);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 1024;
        mainLight.shadow.mapSize.height = 1024;
        scene.add(mainLight);

        // Fill light (softer, from opposite side)
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
        fillLight.position.set(-5, 3, -5);
        scene.add(fillLight);

        // Add a ground plane for better visual reference
        const groundGeometry = new THREE.PlaneGeometry(10, 10);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0x444444,
            roughness: 0.8,
            metalness: 0.2
        });

        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2; // Rotate to be horizontal
        ground.position.y = 0;
        ground.receiveShadow = true;
        scene.add(ground);

        // Load a 3D model (either use a placeholder or provide your own GLTF/GLB model)
        const loadModel = () => {
            const loader = new GLTFLoader();

            // Create a loading manager to track progress
            const manager = new THREE.LoadingManager();
            manager.onProgress = (url, itemsLoaded, itemsTotal) => {
                const progress = (itemsLoaded / itemsTotal) * 100;
                setLoadingProgress(progress);
            };

            // For this example, we'll use a free CC-0 model from Mixamo or ReadyPlayerMe
            // In production, replace with your own model URL
            const modelUrl = '/3d/models/my-avatar.glb';

            // Alternative: Use a placeholder until you have your own model
            // Create a simple character as placeholder
            const createPlaceholderAvatar = () => {
                const avatarGroup = new THREE.Group();

                // Create head
                const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
                const headMaterial = new THREE.MeshStandardMaterial({
                    color: 0xf5d0c5,
                    roughness: 0.7,
                    metalness: 0.1
                });
                const head = new THREE.Mesh(headGeometry, headMaterial);
                head.position.y = 1.5;
                head.castShadow = true;

                // Create body
                const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.5, 1.2, 32);
                const bodyMaterial = new THREE.MeshStandardMaterial({
                    color: 0x3498db,
                    roughness: 0.7,
                    metalness: 0.1
                });
                const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
                body.position.y = 0.6;
                body.castShadow = true;

                // Create eyes
                const eyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
                const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

                const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
                leftEye.position.set(0.18, 1.55, 0.4);

                const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
                rightEye.position.set(-0.18, 1.55, 0.4);

                // Create mouth
                const mouthGeometry = new THREE.BoxGeometry(0.25, 0.05, 0.05);
                const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
                const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
                mouth.position.set(0, 1.35, 0.45);

                // Create arms
                const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 32);
                const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
                leftArm.position.set(0.6, 0.7, 0);
                leftArm.rotation.z = Math.PI / 6;
                leftArm.castShadow = true;

                const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
                rightArm.position.set(-0.6, 0.7, 0);
                rightArm.rotation.z = -Math.PI / 6;
                rightArm.castShadow = true;

                // Create legs
                const legGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 32);
                const leftLeg = new THREE.Mesh(legGeometry, bodyMaterial);
                leftLeg.position.set(0.22, 0, 0);
                leftLeg.castShadow = true;

                const rightLeg = new THREE.Mesh(legGeometry, bodyMaterial);
                rightLeg.position.set(-0.22, 0, 0);
                rightLeg.castShadow = true;

                // Add all parts to the group
                avatarGroup.add(head);
                avatarGroup.add(body);
                avatarGroup.add(leftEye);
                avatarGroup.add(rightEye);
                avatarGroup.add(mouth);
                avatarGroup.add(leftArm);
                avatarGroup.add(rightArm);
                avatarGroup.add(leftLeg);
                avatarGroup.add(rightLeg);

                // Position the avatar
                avatarGroup.position.y = 0.4;

                scene.add(avatarGroup);
                modelRef.current = avatarGroup;
                setModelLoaded(true);
            };

            try {
                // First try to load the real model
                loader.load(
                    modelUrl,
                    (gltf) => {
                        // Success - model loaded
                        const model = gltf.scene;

                        // Scale and position the model as needed
                        model.scale.set(1, 1, 1);
                        model.position.set(0, 0, 0);

                        // Make sure the model casts shadows
                        model.traverse((node) => {
                            if (node.isMesh) {
                                node.castShadow = true;
                                node.receiveShadow = true;
                            }
                        });

                        // Store animations if present
                        if (gltf.animations && gltf.animations.length) {
                            const mixer = new THREE.AnimationMixer(model);
                            mixerRef.current = mixer;

                            // Play the first animation by default (likely idle)
                            const idleAction = mixer.clipAction(gltf.animations[0]);
                            idleAction.play();
                        }

                        // Add to scene
                        scene.add(model);
                        modelRef.current = model;
                        setModelLoaded(true);
                    },
                    // Progress callback
                    (xhr) => {
                        const progress = (xhr.loaded / xhr.total) * 100;
                        setLoadingProgress(progress);
                    },
                    // Error callback
                    (error) => {
                        console.error('Error loading GLTF model:', error);
                        setLoadingError('Failed to load 3D model. Using placeholder.');
                        // Fall back to placeholder
                        createPlaceholderAvatar();
                    }
                );
            } catch (err) {
                console.error('Exception loading model:', err);
                setLoadingError('Failed to load 3D model. Using placeholder.');
                // Fall back to placeholder
                createPlaceholderAvatar();
            }
        };

        // Start loading the model
        loadModel();

        // Create animation loop
        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);

            // Update controls
            if (controlsRef.current) {
                controlsRef.current.update();
            }

            // Update animations if mixer exists
            if (mixerRef.current) {
                const delta = clockRef.current.getDelta();
                mixerRef.current.update(delta);
            }

            // Add subtle animation to placeholder avatar if no animation mixer
            if (modelRef.current && !mixerRef.current) {
                // Simple swaying animation
                const time = Date.now() * 0.001;
                modelRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
            }

            // Render the scene
            renderer.render(scene, camera);
        };

        animate();

        // Add click event listener for avatar interaction
        const handleClick = (event) => {
            if (!modelLoaded) return;

            // Calculate mouse position in normalized device coordinates
            const rect = renderer.domElement.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            // Create raycaster
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2(x, y);
            raycaster.setFromCamera(mouse, camera);

            // Check for intersections with the model
            const modelChildren = [];
            modelRef.current.traverse((child) => {
                if (child.isMesh) {
                    modelChildren.push(child);
                }
            });

            const intersects = raycaster.intersectObjects(modelChildren, true);

            if (intersects.length > 0) {
                // Model was clicked - trigger interaction
                if (typeof onInteract === 'function') {
                    onInteract('clicked');
                }

                // Play a different animation if available
                if (mixerRef.current) {
                    // This assumes your model has a "wave" animation - modify as needed
                    // In a real app, you'd need to know what animations your model has
                    // and select the appropriate one by name or index
                } else {
                    // For placeholder model, do a simple animation
                    const initialRotation = modelRef.current.rotation.clone();

                    // Simple wave animation
                    const waveAnimation = (timestamp) => {
                        const elapsed = timestamp % 1500;
                        const progress = elapsed / 1500;

                        if (progress < 0.25) {
                            modelRef.current.rotation.z = initialRotation.z + (progress * 4) * 0.3;
                        } else if (progress < 0.75) {
                            modelRef.current.rotation.z = initialRotation.z + (1 - (progress - 0.25) * 2) * 0.3;
                        } else {
                            modelRef.current.rotation.z = initialRotation.z;
                        }

                        if (progress < 1) {
                            requestAnimationFrame(waveAnimation);
                        } else {
                            modelRef.current.rotation.copy(initialRotation);
                        }
                    };

                    requestAnimationFrame(waveAnimation);
                }
            }
        };

        renderer.domElement.addEventListener('click', handleClick);

        // Cleanup
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            if (rendererRef.current && containerRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement);
            }

            renderer.domElement.removeEventListener('click', handleClick);

            // Dispose of resources
            if (modelRef.current) {
                scene.remove(modelRef.current);
                modelRef.current.traverse((object) => {
                    if (object.geometry) object.geometry.dispose();
                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach(material => material.dispose());
                        } else {
                            object.material.dispose();
                        }
                    }
                });
            }

            renderer.dispose();
        };
    }, [onInteract]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;

            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;

            // Update camera
            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();

            // Update renderer
            rendererRef.current.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="relative w-full h-full rounded-xl overflow-hidden" style={{ minHeight: '400px' }}>
            {/* 3D canvas container */}
            <div
                ref={containerRef}
                className="w-full h-full"
            />

            {/* Loading indicator */}
            {!modelLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="mb-2 text-white text-lg font-medium">Loading 3D Avatar</div>
                    <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${loadingProgress}%` }}
                        ></div>
                    </div>
                    {loadingError && (
                        <div className="mt-2 text-red-400 text-sm">{loadingError}</div>
                    )}
                </div>
            )}

            {/* Interaction hint (shows briefly when model loads) */}
            {modelLoaded && (
                <div className="absolute bottom-4 left-0 right-0 mx-auto w-max px-4 py-2 bg-black/40 backdrop-blur-sm rounded-lg text-white text-sm opacity-0 animate-fadeInOut pointer-events-none">
                    Click to interact
                </div>
            )}
        </div>
    );
};

export default AdvancedThreeDAvatar;
